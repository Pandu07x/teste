import { Component, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Variable } from 'src/app/_model/Variables.Model';
import { VariableValue } from 'src/app/_model/variableValue.model';
import { AccountService } from 'src/app/_services/account.service';
import { AuthService } from 'src/app/_services/auth.service';
import { DashboardService } from 'src/app/_services/dashboard.service';
import MasterVariable from 'src/assets/Variables List/Development/MasterPanel.json'

@Component({
  selector: 'app-home-layout',
  templateUrl: './home-layout.component.html',
  styleUrls: ['./home-layout.component.css']
})
export class HomeLayoutComponent {
  isExpand = true;
  variables: Variable[] = MasterVariable
  
  isCollapses = true;
  selectedIndex = 0;
  leadinRegionExpanded = true;
  isShown = false;
  collapseRegione = false;
  leadinRegionExpandedBy3;
  leadinRegionExpandedBy2;
  leadinRegionExpandedBy1;
  listOfPermissions = [];
  timeStamp;
  interval;
  constructor(private route:ActivatedRoute , private dashService:DashboardService ,  private accountService: AccountService, private authService: AuthService) {
    const variable = this.variables[3];
    this.interval = setInterval(()=>{
      dashService.getDataByVariableId(variable).subscribe((data:VariableValue)=>{
 
        this.timeStamp = data.timeStamp
      })
    },5000)
  

  }
 
  toggelLeadingRegion(value: number) {
    this.leadinRegionExpanded = !this.leadinRegionExpanded

  }

  checkPermission(permission: string): boolean {
    if (this.listOfPermissions.includes(permission)) {
      return true;
    }
    else {
      return false;
    }
  }

  collapse() {

  }

  logOut() {
    this.accountService.logOut()
  }

}
