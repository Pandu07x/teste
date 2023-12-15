import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppUser } from 'src/app/_model/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  @Input() id: number;
  @Output() onCancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  checkboxes = [
    { label: 'dash.main', displayName: 'View Main Dashboard', selected: false },
    { label: 'dash.testBench', displayName: 'View Test Bench Dashboard', selected: false },
    { label: 'dash.listOfTestBench', displayName: 'View List Of Test Bench Dashboard', selected: false },
    { label: 'dash.reports', displayName: 'View Reports', selected: false },
  ];
  isEditMode = false;
  formData: FormGroup;
  rolesList: { id: number, role: string, selected: boolean }[] = []
  constructor(private toasr: ToastrService, private router: Router, private users: AccountService, private fb: FormBuilder, private authService: AuthService) {
  }
  ngOnInit(): void {
    if (this.id > 0) {
      this.isEditMode = true;
      this.users.getUserByID(this.id).subscribe((data: AppUser) => {
        var fullname = data.fullName.split(" ");
        var firstName = fullname[0];
        var lastName = fullname[1];
        this.formData = this.fb.group({
          userId: [data.id],
          userName: [data.userName, [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]],
          password: ['', [Validators.required, this.passwordComplexityValidator()]],
          isPassWordChange: [false],
          firstName: [firstName, Validators.required],
          lastName: [lastName, Validators.required],
          fullName: [data.fullName],
          roles: [data.roles[0], Validators.required],
          claims: [data.claims, Validators.required]
        });

        data.claims.map(v => {
          this.checkboxes.map(x => {
            if (v.claimValue == x.label) {
              x.selected = true;
            }
          })
        });

        this.users.getAllRoles().subscribe((data2: any[]) => {
          data2.map(x => this.rolesList.push({ id: x.id, role: x.name, selected: false }));
          data.roles.map(x => {
            this.rolesList.map(y => {
              if (y.id == x.roleId) {
                y.selected = true;
              }
            })
          })
        })
      })
    }
    else {
      this.formData = this.fb.group({
        userName: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$")]],
        password: ['', [Validators.required, this.passwordComplexityValidator()]],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        fullName: [''],
        roles: ['', Validators.required],
        claims: ['', Validators.required]
      })
      this.getRoles();
    }
  }

  passwordComplexityValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      console.log(control.value)
      const value: string = control.value;
      const hasUppercase = /[A-Z]/.test(value);
      const hasLowercase = /[a-z]/.test(value);
      const hasNumber = /[0-9]/.test(value);
      const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value);

      const isValid = hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter;

      return isValid ? null : { 'passwordComplexity': true };
    };
  }

  get passwordControl() {
    return this.formData.get('password');
  }

  getRoles() {
    this.users.getAllRoles().subscribe((data: any[]) => {
      data.map(x => this.rolesList.push({ id: x.id, role: x.name, selected: false }))
    })
  }

  cancel() {
    this.onCancel.emit(false);
  }

  onRoleSelect(item) {
    if (item.selected) {
      this.users.getRolePermissions(item.role).subscribe((data: string[]) => {
        this.checkboxes.map(x => {
          if (data.includes(x.label)) {
            x.selected = true
          }
        })
      })
    }
    else {
      this.checkboxes.map(x => {
        x.selected = false
      })
    }
  }



  createUser() {

    const firstName = this.formData.get('firstName').value;
    const lastName = this.formData.get('lastName').value;
    const fullName = firstName + " " + lastName;
    this.formData.get('fullName').setValue(fullName);
    if (this.isEditMode) {
      var listOfClaimsToSend: claimDto[] = [];
      var listOFRolesToSend: roleDto[] = [];

      this.rolesList.map(x => {
        var modle: roleDto = {
          roleId: x.id,
          roleName: x.role,
          status: x.selected
        };
        listOFRolesToSend.push(modle);
      });

      this.checkboxes.map(x => {
        var model: claimDto = {
          claimValue: x.label,
          status: x.selected
        }
        listOfClaimsToSend.push(model);
      })

      this.formData.get('claims').setValue(listOfClaimsToSend);
      this.formData.get('roles').setValue(listOFRolesToSend);
      if (this.formData.get('password').dirty) {
        this.formData.get('isPassWordChange').setValue(true);
      }
      this.users.updateUser(this.formData.value).subscribe({
        next: () => {
          this.toasr.success("User updated successfully");
          this.onCancel.emit(false);

        },
        error: (err) => {
          console.log(err.err);
          this.toasr.error("Something went wrong");
        }
      })
    }
    else {
      var listOfClaimsToCreate = [];
      var listOFRolesToCreate = [];
      this.rolesList.map(x => {
        if (x.selected) {
          listOFRolesToCreate.push(x.role);
        }
      });

      this.checkboxes.map(x => {
        if (x.selected) {
          listOfClaimsToCreate.push(x.label);
        }
      })

      this.formData.get('claims').setValue(listOfClaimsToCreate);
      this.formData.get('roles').setValue(listOFRolesToCreate);
      this.users.createNewUSer(this.formData.value).subscribe({
        next: () => {
          this.toasr.success("User created successfully");
          this.onCancel.emit(false);
        },
        error: (err) => {
          console.log(err.err);
          this.toasr.error("Something went wrong");
        }
      })
    }
  }
}

export class roleDto {
  roleId: number
  roleName: string
  status: boolean
}

export class claimDto {
  claimValue: string
  status: boolean
}