import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeLayoutComponent } from './_layouts/home-layout/home-layout.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { TestBenchDashboardComponent } from './components/test-bench-dashboard/test-bench-dashboard.component';
import { HistoricalReportComponent } from './components/historical-report/historical-report.component';
import { TestBenchListComponent } from './components/test-bench-list/test-bench-list.component';
import { UserManagerComponent } from './components/User-Management/user-manager/user-manager.component';
import { CreateUserComponent } from './components/User-Management/create-user/create-user.component';
import { CreateRoleComponent } from './components/User-Management/create-role/create-role.component';
import { Report2Component } from './components/report2/report2.component';
import { FusionchartsComponent } from './components/fusioncharts/fusioncharts.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LoginLayoutComponent } from './_layouts/login-layout/login-layout.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'logIn',
    pathMatch:'full',
    //component: LoginComponent,
    // children: [
    //   {
    //     path:'',
    //     redirectTo:'logIn',
    //     pathMatch:'full'
    //   },
    //   {
    //     path: 'logIn',
    //     component: LoginComponent
    //   },
    // ]
  },
  { path: 'logIn', component: LoginComponent },
  {
    path: 'home',
    component: SideNavComponent,
    // canActivate:[AuthGuard],
    children: [
      {
        path: '',
        component: MainDashboardComponent,
        // canActivate:[AuthGuard,PermissionGuard],
        // data:{
        //   permission:[
        //     'dash.main',
        //   ]
        // }
      },
      {
        path: 'testbenchdashboard/:group/:testbenchnu',
        component: TestBenchDashboardComponent,
        // canActivate:[AuthGuard,PermissionGuard],
        data:{
          permission:[
            'dash.testBench',
          ]
        }
      },
      {
        path: 'testbenchdashboard',
        component: TestBenchDashboardComponent,
        // canActivate:[AuthGuard,PermissionGuard],
        data:{
          permission:[
            'dash.testBench',
          ]
        }
      },
      {
        path: 'historicalreport',
        component: HistoricalReportComponent,
        // canActivate:[AuthGuard,PermissionGuard],
        data:{
          permission:[
            'dash.reports',
          ]
        }
      },
      {
        path: 'testbench',
        component: TestBenchListComponent,
        // canActivate:[AuthGuard,PermissionGuard],
        data:{
          permission:[
            'dash.listOfTestBench',
          ]
        }
      },
      {
        path: 'report2',
        component: Report2Component,
        // canActivate:[AuthGuard,PermissionGuard],
        data:{
          permission:[
            'dash.reports',
          ]
        }
      },
      {
        path: 'fusionchart',
        component: FusionchartsComponent,
        data:{
          permission:[
            'dash.fusioncharts',
          ]
        }
      },
    ]
  },
  {
    path:'usermanager',
    component:HomeLayoutComponent,
    children:[
      {
        path:'',
        component:UserManagerComponent,
        // canActivate:[AuthGuard,PermissionGuard],
        data:{
          permission:[
            'users.view',
          ]
        }
      },
      {
        path:'createuser',
        component:CreateUserComponent,
        // canActivate:[AuthGuard,PermissionGuard],
        data:{
          permission:[
            'users.manage',
          ]
        }
      },
      {
        path:'edituser/:id/edit',
        component:CreateUserComponent,
        // canActivate:[AuthGuard,PermissionGuard],
        data:{
          permission:[
            'users.manage',
          ]
        }
      },
      {
        path:'createrole',
        component:CreateRoleComponent,
        // canActivate:[AuthGuard,PermissionGuard],
        data:{
          permission:[
            'roles.manage',
          ]
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
