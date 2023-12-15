import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog'
import { MatTableExporterModule } from 'mat-table-exporter';

import * as FusionCharts from '../assets/js/fusioncharts/js/fusioncharts';
import * as Charts from '../assets/js/fusioncharts/js/fusioncharts.charts';
import * as gantt from '../assets/js/fusioncharts/js/fusioncharts.gantt';
import fusion from '../assets/js/fusioncharts/js/themes/fusioncharts.theme.fusion';
import * as Widgets from '../assets/js/fusioncharts/js/fusioncharts.widgets';
import { FusionChartsModule } from 'angular-fusioncharts';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { HomeLayoutComponent } from './_layouts/home-layout/home-layout.component';
import { HistoricalReportComponent } from './components/historical-report/historical-report.component';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { TestBenchDashboardComponent } from './components/test-bench-dashboard/test-bench-dashboard.component';
import { TestBenchListComponent } from './components/test-bench-list/test-bench-list.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginLayoutComponent } from './_layouts/login-layout/login-layout.component';
import { LoginComponent } from './components/login/login.component';
import { UserManagerComponent } from './components/User-Management/user-manager/user-manager.component';
import { CreateUserComponent } from './components/User-Management/create-user/create-user.component';
import { CreateRoleComponent } from './components/User-Management/create-role/create-role.component';
import { MatTabsModule } from '@angular/material/tabs';
import { Report2Component } from './components/report2/report2.component';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule, DatePipe } from '@angular/common';
import { CreateTemplateComponent } from './components/Dialoge/create-template/create-template.component';
import { CreateTemplateChartComponent } from './components/Dialoge/create-template-chart/create-template-chart.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import { Routes, RouterModule } from '@angular/router';
import {MatSnackBarModule} from '@angular/material/snack-bar';

// import {PaginationModule} from 'ngx-bootstrap/pagination'
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { FusionchartsComponent } from './components/fusioncharts/fusioncharts.component';
import { SideNavComponent } from './side-nav/side-nav.component';
FusionChartsModule.fcRoot(FusionCharts, Charts, Widgets, gantt, fusion);


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    HomeLayoutComponent,
    MainDashboardComponent,
    TestBenchDashboardComponent,
    HistoricalReportComponent,
    TestBenchListComponent,
    LoginLayoutComponent,
    LoginComponent,
    UserManagerComponent,
    CreateUserComponent,
    CreateRoleComponent,
    Report2Component,
    CreateTemplateComponent,
    CreateTemplateChartComponent,
    FusionchartsComponent,
    SideNavComponent,
    
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatBadgeModule,
    MatIconModule,
    MatMenuModule,
    FusionChartsModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatTableExporterModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    ToastrModule.forRoot({
      positionClass: 'toast-top-right'
    }),
    MatTabsModule,
    MatPaginatorModule,
    MatSortModule,
    MatDividerModule,
    MatToolbarModule,
    MatSnackBarModule
    // PaginationModule.forRoot(),
  ],
  entryComponents: [
    FusionchartsComponent, // Add this line if using MatDialog
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
