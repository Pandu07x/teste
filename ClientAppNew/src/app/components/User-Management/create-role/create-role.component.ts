import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role } from 'src/app/_model/user.model';
import { AccountService } from 'src/app/_services/account.service';
import { claimDto } from '../create-user/create-user.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.css']
})
export class CreateRoleComponent implements OnInit {
  formData:FormGroup;
  isEditMode = false
  @Input() id:number;
  @Output() onCancel: EventEmitter<boolean> = new EventEmitter<boolean>();

  checkboxes = [
    { label: 'dash.main', displayName: 'View Main Dashboard', selected: false },
    { label: 'dash.testBench', displayName: 'View Test Bench Dashboard', selected: false },
    { label: 'dash.listOfTestBench', displayName: 'View List Of Test Bench Dashboard', selected: false },
    { label: 'dash.reports', displayName: 'View Reports', selected: false },
  ];
  constructor(private toasr:ToastrService,private router:Router,private fb:FormBuilder,private accountService:AccountService)
  {
    
  }

  ngOnInit(): void {
    if(this.id >0)
    {
      this.isEditMode = true;
      this.accountService.getRoleById(this.id).subscribe((data:Role)=>{
        this.formData = this.fb.group({
          roleId:[data.id],
          roleName: [data.name, Validators.required],
          description: [data.description, Validators.required],
          claims: [''],
        });

        data.claims.map(v => {
          this.checkboxes.map(x =>{
            if(v.claimValue == x.label)
            {
              x.selected = true;
            }
          })
        });
      })
    }
    else
    {
      this.formData = this.fb.group({
        roleName: ['', Validators.required],
        description: ['', Validators.required],
        claims: [''],
      })
    }
  }

  cancel()
  {
    this.onCancel.emit(false);
  }

  createUser() {
    if(!this.isEditMode)
    {
      var listOfClaimsToSend = [];
      const listOfClaims = this.checkboxes.filter(x => x.selected)
      listOfClaims.map(x => listOfClaimsToSend.push(x.label))
      this.formData.get('claims').setValue(listOfClaimsToSend);
      this.accountService.createRole(this.formData.value).subscribe({
        next:()=>{
          this.toasr.success("Role created successfully");
          this.onCancel.emit(false);
        },
        error:(err)=>{
          console.log(err.err);
          this.toasr.error("Something went wrong");
      }
      });
    }
    else{
      var listOfClaimsToUpdate:claimDto[] = [];

      this.checkboxes.map(x =>{
        var model:claimDto ={
          claimValue:x.label,
          status:x.selected
        }
        listOfClaimsToUpdate.push(model);
      });

      this.formData.get('claims').setValue(listOfClaimsToUpdate);
      this.accountService.updateRole(this.formData.value).subscribe({
        next:()=>{
          this.toasr.success("Role updated successfully");
          this.onCancel.emit(false);
        },
        error:(err)=>{
          console.log(err.err);
          this.toasr.error("Something went wrong");
      }
      });
    }
  }
}
