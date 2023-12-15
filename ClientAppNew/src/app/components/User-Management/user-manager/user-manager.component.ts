import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AppUser, USerDto, User, localStorageModel } from 'src/app/_model/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { AuthService } from 'src/app/_services/auth.service';


export interface permissionModel {
  permission: string,
  status: boolean
}

@Component({
  selector: 'app-user-manager',
  templateUrl: './user-manager.component.html',
  styleUrls: ['./user-manager.component.css']
})



export class UserManagerComponent implements OnInit {
  userList: any[] = [];
  isEditUser = false;
  selectedUserId;
  selectedRoleId;
  isCreateUser = false;
  rolesList: { role: string, selected: boolean }[] = []
  loggedInUser: User;
  formData: FormGroup
  permissions = [];
  dataSource2;
  isCreateRole = false;
  checkboxes = [
    { label: 'dash.main', displayName: 'View Main Dashboard', selected: false },
    { label: 'dash.testBench', displayName: 'View Test Bench Dashboard', selected: false },
    { label: 'dash.listOfTestBench', displayName: 'View List Of Test Bench Dashboard', selected: false },
    { label: 'dash.reports', displayName: 'View Reports', selected: false },
  ];
  isEditRole = false;
  dataSource = new MatTableDataSource();
  displayedColumns=['UserName','Full Name','Role','Updated Date','Action']
  displayedColumns2=['Role','Description','Updated Date','Action']

  constructor(private spinner:NgxSpinnerService ,private toasr:ToastrService ,private users: AccountService, private fb: FormBuilder,private authService:AuthService) {
    this.formData = fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fullName: [''],
      roles: ['', Validators.required],
      claims: ['', Validators.required]
    });
    this.permissions = authService.getUserPermissions();
    this.getUsers();
    this.getRoles();
  }
  ngOnInit(): void {
  }

  canceled(event:boolean)
  {
    this.isCreateUser = event;
    this.getUsers();
    this.isEditUser = event;
  }

  editUserWindow(id)
  {
    this.selectedUserId = id;
    this.isEditUser = true;
  }
  editRoleWindow(id)
  {
    this.selectedRoleId = id;
    this.isEditRole = true;
  }

  createUserWindow(id)
  {
    this.isCreateUser = true;
  }

  canceledRole(event:boolean)
  {
    this.isCreateRole = event
    this.isEditRole = event
    this.getRoles();
  }

  deleteUser(user:AppUser)
  {
    alert("here")
    var roles  = []
    user.roles.map(x => {
      roles.push(x.name)
    })
    var model ={
      userId:user.id,
      roles:roles
    }
    this.spinner.show()
    
    console.log(model)
    this.users.deleteUser(model).subscribe({next:(data)=>{
      this.toasr.success("User Deleted successfully");
      this.spinner.hide()
      this.getUsers();
    },
    error:(err)=>{
      this.toasr.error(err.error);
    this.spinner.hide()
    }
  })
    
  }

  getUsers() {
    this.userList = []
    this.users.getAllUsers().subscribe((data:USerDto[]) => {
      data.map(x => {
        x.user.roles = x.roles
        this.userList.push(x.user)
      });
      this.dataSource = new MatTableDataSource(this.userList)
    })
  }

  isCreate = false;

  getRoles() {
    this.rolesList = []
    this.users.getAllRoles().subscribe((data: any[]) => {
      this.dataSource2 = data
      data.map(x => this.rolesList.push({ role: x.name, selected: false }))
    })
  }

  deleteRole(name)
  {
    var model ={
      roleName:name
    }
    this.users.deleteRole(model).subscribe({
      next:()=>{
        this.toasr.success("Role Deleted successfully");
        this.getRoles();
      },
      error:(err)=>{
        console.log(err.err);
        this.toasr.error(err.error);
    }
    })
  }

  viewUser(userId:string)
  {

  }

  // createUser() {
  //   var listOfClaimsToSend = [];
  //   var listOFRolesToSend = [];
   
  //   const listOFRoles = this.rolesList.filter(x => x.selected);
  //   listOFRoles.map(v => listOFRolesToSend.push(v.role))

  //   const listOfClaims = this.checkboxes.filter(x => x.selected)
  //   listOfClaims.map(x => listOfClaimsToSend.push(x.label))
  //   this.formData.get('claims').setValue(listOfClaimsToSend);
  //   this.formData.get('roles').setValue(listOFRolesToSend);
  //   const firstName = this.formData.get('firstName').value;
  //   const lastName = this.formData.get('lastName').value;
  //   const fullName = firstName + " "+lastName;
  //   this.formData.get('fullName').setValue(fullName);
  //   this.users.createNewUSer(this.formData.value).subscribe({
  //     next:(_)=>{
  //       this.toasr.success("User Created Successfully")
  //     },
  //     error:()=>{

  //     }
  //   })

    
  // }

  onRoleSelect(item)
  {
    if(item.selected)
    {
      this.users.getRolePermissions(item.role).subscribe((data:string[])=>{
        this.checkboxes.map(x => {
          if(data.includes(x.label))
          {
            x.selected = true
          }
        })
      })
    }
    else
    {
      this.checkboxes.map(x => {
        x.selected = false
      })
    }
  }

  checkPermission(permission: string): boolean {
    if (this.permissions.includes(permission)) {
      return true;
    }
    else {
      return false;
    }
  }

}
