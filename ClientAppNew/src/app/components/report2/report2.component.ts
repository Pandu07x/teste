import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ColumnMaster, FilterTemplateDto } from 'src/app/_model/report.model';
import { ReportServicesService } from 'src/app/_services/report-services.service';

//Group A json
import variableData from 'src/assets/Variables List/Production/IOT1-GA.json'
//Group B json
import variableData_B from 'src/assets/Variables List/Production/IOT2-GB.json'

//import variableData from 'src/assets/VariablesListGroup_A.json'
import { BulkData, Variable } from 'src/app/_model/Variables.Model';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { HttpClient } from '@angular/common/http';
import { MatSort } from '@angular/material/sort';
import { environment } from 'src/environments/environment';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-report2',
  templateUrl: './report2.component.html',
  styleUrls: ['./report2.component.css']
})
export class Report2Component  {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  dataSource = new MatTableDataSource()
  chartData;
  maxDate = new Date()
  baseUrl = environment.Edge_Url;
  apiUrl = environment.API_URL;
  category = []
  dataSet = []
  dataSource123 = new MatTableDataSource()
  width = '100%';
  height = '400';
  type2;
  fromRaw;
  toRow;
  from :Date;
  to :Date;
  displayedCols = []
  createTemplate = false;
  type = "msline";
  templateName = ""
  dataFormat = "json";
  stdFilter = "";
  selectedTemplateIndex: number;
  dataSource2 = new MatTableDataSource();
  displayedColumns: string[] = [];
  formData: FormGroup;
  listOfCols: ColumnMaster[] = []
  listOfTemplates: FilterTemplateDto[] = [];
  toppings = new FormControl([]);
  tableData = [];
  listOfProjId = []

// Group A.................
   // Array for GA
  variableList: Variable[] = variableData;

  //Array for GB
  variableList_B: Variable[] = variableData_B;

  //Create Model to design Data table

  columnsToDisplay = ['Project Id', 'Project Number', 'Project Name','Owner Name' ,'Start Time', 'End time' ,'Test Bench','Configuration', 'Group Name','Test Serial Number' ]
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  //Group = this.route.snapshot.paramMap.get('group')

  constructor(private http: HttpClient, private timeService: DashboardService, private dialog: MatDialog, private fb: FormBuilder, private toast: ToastrService, private spinner: NgxSpinnerService, private reportService: ReportServicesService) {
    
    var variables = this.variableList.filter(x => x.dataType != 'String' && x.dataType != "Bool")
    variables.map(x => {
      var model: ColumnMaster = {
        columnName: x.variableName,
      }
      this.listOfCols.push(model);
    });

    this.formData = fb.group({
      tableArray: fb.array([])
    });

    reportService.getRoles().subscribe()
  }
 
  //product type selection dropdown
  typeChange(num: number): string {
    if (num == 0) {
      return 'No Type'
    }
    else if (num == 1) {
      return 'EODD'
    }
    else if (num == 2) {
      return 'AODD'
    }
    else {
      return 'NA'
    }
  }

  projConfig(num: number): string {
    if (num == 0) {
      return 'Perfomance'
    }
    if (num == 1) {
      return "Endurance"
    }
    return ''
  }

  apply() {

    this.from = new Date(this.fromRaw)
    this.to = new Date(this.toRow)

    this.projectId = 0
    this.spinner.show()
    this.tableData = []
    this.category = []
    this.dataSet = []
    this.chartData = null
   
    //Group A Variables
    var variableprojId = this.variableList.filter(x => x.variableName == 'ProjectId')[0].variableId
    var variableNumber = this.variableList.filter(x => x.variableName == 'ProjectNumber')[0].variableId
    var variableName = this.variableList.filter(x => x.variableName == 'ProjectName')[0].variableId
    var variableOwner = this.variableList.filter(x => x.variableName == 'ProjectOwner')[0].variableId
    var variableTestNo = this.variableList.filter(x => x.variableName == 'TestBenchNo')[0].variableId
    var variableConfig = this.variableList.filter(x => x.variableName == 'ProjectConfig')[0].variableId
    var variableType = this.variableList.filter(x => x.variableName == 'ProjectType')[0].variableId
    var variableTestCount = this.variableList.filter(x => x.variableName == 'TestRunCount')[0].variableId
    //var variableTestBenchStartStop= this.variableList.filter(x => x.variableName == 'TestBench_StartStop')[0].variableId

    var VariableAspect = this.variableList.filter(x => x.aspectName == 'IP1GA_ProcessData')[0].variableId

    var listOfvar = [variableprojId,variableNumber,variableName,variableOwner,variableTestNo,variableConfig, variableType,VariableAspect, variableTestCount]

    // Group B Variables
    var variableprojId_B = this.variableList_B.filter(x => x.variableName == 'ProjectId')[0].variableId
    var variableNumber_B = this.variableList_B.filter(x => x.variableName == 'ProjectNumber')[0].variableId
    var variableName_B = this.variableList_B.filter(x => x.variableName == 'ProjectName')[0].variableId
    var variableOwner_B = this.variableList_B.filter(x => x.variableName == 'ProjectOwner')[0].variableId
    var variableTestNo_B = this.variableList_B.filter(x => x.variableName == 'TestBenchNo')[0].variableId
    var variableConfig_B = this.variableList_B.filter(x => x.variableName == 'ProjectConfig')[0].variableId
    var variableType_B = this.variableList_B.filter(x => x.variableName == 'ProjectType')[0].variableId
    var variableTestCount_B = this.variableList_B.filter(x => x.variableName == 'TestRunCount')[0].variableId
   // var variableTestBenchStartStop_B = this.variableList_B.filter(x => x.variableName == 'TestBench_StartStop')[0].variableId

    var VariableAspect_B = this.variableList_B.filter(x => x.aspectName == 'IP1GB_ProjectData')[0].variableId

    var listOfvarB = [variableprojId_B,variableNumber_B,variableName_B,variableOwner_B,variableTestNo_B,variableConfig_B, variableType_B,VariableAspect_B, variableTestCount_B]

   
//Date Filter
   var startDate = this.timeService.getValidDateString(this.from);
   var end = this.timeService.getValidDateString(this.to);
   
//Models to load data
    var modelGA = []
    var modelGB = []
    var master=[]

    for(let i4 = 0 ; i4 < listOfvar.length;i4++)
    {
      modelGA.push({
      "variableId": listOfvar[i4],
      "order": 'Descending',
      "from": startDate,
      "to": end,
      "limit":100   
    })

    modelGB.push({
      "variableId": listOfvarB[i4],
      "order": 'Descending',
      "from": startDate,
      "to": end,
      "limit":100
    })
  }
  
    //bulk data read query
    var url =`DataService/Data/Bulk/Read`;

    var model = {
      "url":url,
      "json":modelGA
    }

    var model2 = {
      "url":url,
      "json":modelGB
    }

    //Main models
    master.push(model)
    master.push(model2)

    master.map((x)=>{
     
        var reportData = this.reportService.getReportData(x )
      
      reportData.subscribe({
           next: (data: BulkData[]) => {

          this.spinner.hide();
         
          var groupname="";
          if(data[0].data[0]["variableId"]=="5de44768eaa842658cd93e8fb0a27d8b"){
            groupname="A"
          }
          else if(data[0].data[0]["variableId"]=="77e6939a81a141d3a3ba785a14f95dd1"){
            groupname="B"
          }
        
          data[0].data[0].values.map((x,i) => {
            const timestamp = new Date(x.timestamp);

            if (timestamp >= this.from && timestamp <= this.to) {
            
            if (this.typeChange(data[6].data[0].values[i].value) == this.type2) {
              if (!this.listOfProjId.includes(x.value.toString())) {
                
                 this.reportService.getProjectRunTime2(data[0].data[0].values[i].value, groupname).subscribe((data2)=>{
                 
                    var model2 = {
                      projectId: x.value,
                      projectNumber: data[1].data[0].values[i].value,
                      projectName: data[2].data[0].values[i].value,
                      projectOwnwer: data[3].data[0].values[i].value,
                      projectTestNo: data[4].data[0].values[i].value,
                      projectConfig: data[5].data[0].values[i].value,
                      testRunCount: data[8].data[0].values[i].value,
                      startTime: x.timestamp,
                      projectEndTime: data2,
                    
                      group:groupname
                    }
                    
                    this.tableData.push(model2)
                    this.dataSource123.data = this.tableData
                   
                })
              }     
            }
            }
          });
          //this.spinner.hide()
          
        },
        error: (err) => {
          //this.spinner.hide()
        }
      });
    })
      
    // reportData.subscribe({
    //   next: (data: BulkData[]) => {
    //     this.spinner.hide();
    //     console.log(data,'newww')

    //     //console.log(data)
    //     data[0].data[0].values.map((x, i) => {
    //       if (this.typeChange(data[6].data[0].values[i].value) == this.type2) {
    //         if (!this.listOfProjId.includes(x.value.toString())) {
    //           this.reportService.getProjectRunTime(data[0].data[0].values[i].value).subscribe((data2)=>{
               
    //             //if(data2)
    //             //{
    //               var  model2 = {
    //                 projectId: x.value,
    //                 projectNumber:data[1].data[0].values[i].value,
    //                 projectName:data[2].data[0].values[i].value,
    //                 projectOwnwer:data[3].data[0].values[i].value,
    //                 projectTestNo:data[4].data[0].values[i].value,
    //                 projectConfig:data[5].data[0].values[i].value,
    //                 projectEndTime:data2,
    //                 startTime: x.timestamp
    //               }
                  
    //               this.tableData.push(model2)
    //               this.dataSource123.data = this.tableData
    //               console.log(model2,'report data')
    //               //return model2
    //             //}
    //           })
    //         }     
    //       }
          
    //     });
    //     console.log(this.tableData, 'tabale data')
    //     return data
        
    //     //this.spinner.hide()
        
    //   },
    //   error: (err) => {
    //     //this.spinner.hide()
    //   }
    // });
    // console.log(reportData,'report data')
    //console.log(model123,'data')
    // return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model).subscribe({
    //   next: (data: BulkData[]) => {
    //     this.spinner.hide();

    //     //console.log(data)
    //     data[0].data[0].values.map((x, i) => {
    //       if (this.typeChange(data[6].data[0].values[i].value) == this.type2) {
    //         if (!this.listOfProjId.includes(x.value.toString())) {
    //           this.reportService.getProjectRunTime(data[0].data[0].values[i].value).subscribe((data2)=>{
               
    //             //if(data2)
    //             //{
    //               var model2 = {
    //                 projectId: x.value,
    //                 projectNumber:data[1].data[0].values[i].value,
    //                 projectName:data[2].data[0].values[i].value,
    //                 projectOwnwer:data[3].data[0].values[i].value,
    //                 projectTestNo:data[4].data[0].values[i].value,
    //                 projectConfig:data[5].data[0].values[i].value,
    //                 projectEndTime:data2,
    //                 startTime: x.timestamp
    //               }
    //               this.tableData.push(model2)
    //               this.dataSource123.data = this.tableData
                  
    //             //}
    //           })
    //         }     
    //       }
          
    //     });
        
    //     this.spinner.hide()
    //     return data
    //   },
    //   error: (err) => {
    //     this.spinner.hide()
    //   }
    // });
      

    //Old code of Docker Testing Data

    // return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, model123).subscribe({
    //   next: (data: BulkData[]) => {
    //     data[0].data[0].values.map((x, i) => {
    //       if (this.typeChange(data[6].data[0].values[i].value) == this.type2) {
            
    //         if (!this.listOfProjId.includes(x.value)) {
    //           this.listOfProjId.push(x.value)
    //           console.log(this.listOfProjId ,x.value )
    //           this.reportService.getProjectRunTime(data[0].data[0].values[i].value).subscribe((data2)=>{
    //             if(data2)
    //             {
    //               var model2 = {
    //                 projectId: x.value,
    //                 projectNumber:data[1].data[0].values[i].value,
    //                 projectName:data[2].data[0].values[i].value,
    //                 projectOwnwer:data[3].data[0].values[i].value,
    //                 projectTestNo:data[4].data[0].values[i].value,
    //                 projectConfig:data[5].data[0].values[i].value,
    //                 projectEndTime:data2,
    //                 startTime: x.timestamp
    //               }
    //               this.tableData.push(model2)
    //               this.dataSource123.data = this.tableData
                  
    //             }
    //           })
    //         }     
    //       }
          
    //     });
        
    //     this.spinner.hide()
    //     return data
    //   },
    //   error: (err) => {
    //     this.spinner.hide()
    //   }
    // });

  }

  checkDateValue(x, startDate): boolean {
    if (x.timestamp) {
      const valueDate = new Date(x.timestamp)

      if (valueDate.getDate() == startDate.getDate()) {
        return true;
      }
      return false;
    }
    else {
      return false
    }
  }

  checkMonthValue(x, startDate): boolean {
    if (x.timestamp) {
      const valueDate = new Date(x.timestamp)
      if (valueDate.getMonth() == startDate.getMonth()) {
        return true;
      }
      return false;
    }
    else {
      return false
    }
  }

  projectId;

  assignProjectId(projectId, from, to,group ) {
    this.spinner.show()
    this.category = []
    this.displayedCols = []
    this.dataSet = []
    var models = []
    var cols = ['TestRun_ProjectId']

    var startDate = new Date(from);
    startDate.setHours(startDate.getHours()-5)
    startDate.setMinutes(startDate.getMinutes()-30)

    var endDate = new Date(to);
    endDate.setHours(endDate.getHours()-5)
    endDate.setMinutes(endDate.getMinutes()-30)
    
    cols.push(...this.toppings.value)

    this.displayedCols.push('TimeStamp',...this.toppings.value)

    cols.map(x => {
     
        if(group=="A"){
          var md = {
            "variableId": this.variableList.filter(y => y.variableName == x)[0].variableId,
            "order": 'Ascending',
            "from": this.timeService.getValidDateString(startDate),
            "to": this.timeService.getValidDateString(endDate),
            "limit":100 
          }
        }
        else if(group=="B"){
          var md = {
            "variableId": this.variableList_B.filter(y => y.variableName == x)[0].variableId,
            "order": 'Ascending',
            "from": this.timeService.getValidDateString(startDate),
            "to": this.timeService.getValidDateString(endDate),
            "limit":100
          }
        }
        
        models.push(md)
      })
    //   cols.map(x => {
    //   var md1 = {
    //     "variableId": this.variableList_B.filter(y => y.variableName == x)[0].variableId,
    //     "order": 'Ascending',
    //     "from": this.timeService.getValidDateString(startDate),
    //     "to": this.timeService.getValidDateString(endDate),
    //     "limit":100
    //   }
    //   models.push(md1)
    //   console.log(md1,"B")
    // })
    
    this.projectId = projectId;
 
    this.reportService.getTableData(models).subscribe((data: BulkData[]) => {
      var tableData12 = []

    // if TestRun_ProjectId == ProjectId
   
    if(data[0].data[0].values[1].value == projectId){

      data[1].data[0].values.map(((y , i)=>{
        var model = {};
        data.map((z,i3) =>{
          if(i3 >=1)
          {
            model[cols[i3]] = z.data[0].values[i]?.value
          }
          var timestamp = new Date(data[1].data[0].values[i].timestamp)

          model['TimeStamp'] = timestamp.getDate()+'/'+timestamp.getMonth()+'/'+timestamp.getFullYear()+' '+timestamp.getHours()+':'+timestamp.getMinutes()+':'+timestamp.getSeconds()
        
        });
        tableData12.push(model)
      }))
    }
      
      this.dataSource = new MatTableDataSource(tableData12);
      this.dataSource.paginator = this.paginator
      this.spinner.hide()
    })
  }
}

const dataSource = [
  {
    'pRId': 101,
    'tbId': 100,
    'iotPId': 100,
    'uId': 100,
    'PrName': 100,
    'PrNumber': 100,
    'gravFlow': 100,
    'magFlow': 100,
    'tstStopTime': 100,
    'FC-1Enable': 100,
    'UpdatedDate': 100,
    'TestObjectName': 101,
    'PrType': 10,
    'tsStartTime': 10,
    'TstSrNo': 10,
    'tstId': 10,
  },
  {
    'pRId': 101,
    'tbId': 10,
    'iotPId': 10,
    'uId': 10,
    'PrName': 10,
    'PrNumber': 10,
    'gravFlow': 10,
    'magFlow': 10,
    'tstStopTime': 200,
    'FC-1Enable': 10,
    'UpdatedDate': 10,
    'TestObjectName': 101,
    'PrType': 10,
    'tsStartTime': 10,
    'TstSrNo': 10,
    'tstId': 10,
  },
  {
    'pRId': 102,
    'tbId': 10,
    'iotPId': 10,
    'uId': 10,
    'PrName': 10,
    'PrNumber': 101,
    'gravFlow': 10,
    'magFlow': 10,
    'tstStopTime': 10,
    'FC-1Enable': 10,
    'UpdatedDate': 10,
    'TestObjectName': 101,
    'PrType': 10,
    'tsStartTime': 10,
    'TstSrNo': 10,
    'tstId': 10,
  },
  {
    'pRId': 103,
    'tbId': 10,
    'iotPId': 10,
    'uId': 10,
    'PrName': 105,
    'PrNumber': 10,
    'gravFlow': 10,
    'magFlow': 10,
    'tstStopTime': 10,
    'FC-1Enable': 10,
    'UpdatedDate': 10,
    'TestObjectName': 101,
    'PrType': 10,
    'tsStartTime': 10,
    'TstSrNo': 10,
    'tstId': 10,
  },
  {
    'pRId': 104,
    'tbId': 10,
    'iotPId': 10,
    'uId': 10,
    'PrName': 10,
    'PrNumber': 10,
    'gravFlow': 10,
    'magFlow': 10,
    'tstStopTime': 10,
    'FC-1Enable': 10,
    'UpdatedDate': 10,
    'TestObjectName': 101,
    'PrType': 10,
    'tsStartTime': 10,
    'TstSrNo': 10,
    'tstId': 10,
  },
  {
    'pRId': 105,
    'tbId': 10,
    'iotPId': 10,
    'uId': 10,
    'PrName': 10,
    'PrNumber': 10,
    'gravFlow': 10,
    'magFlow': 10,
    'tstStopTime': 10,
    'FC-1Enable': 10,
    'UpdatedDate': 10,
    'TestObjectName': 10,
    'PrType': 10,
    'tsStartTime': 10,
    'TstSrNo': 10,
    'tstId': 10,
  },
  
]

const data = {
  chart: {
    caption: "Yearly sales of iPhone",
    yaxisname: "Number of units sold",
    subcaption: "2007-2016",
    plottooltext: "<div><b>$dataValue</b> iPhones sold in $label</div>",
    theme: "candy"
  },
  data: [
    {
      label: "2007",
      value: "1380000"
    },
    {
      label: "2008",
      value: "1450000"
    },
    {
      label: "2009",
      value: "1610000"
    },
    {
      label: "2010",
      value: "1540000"
    },
    {
      label: "2011",
      value: "1480000"
    },
    {
      label: "2012",
      value: "1573000"
    },
    {
      label: "2013",
      value: "2232000"
    },
    {
      label: "2014",
      value: "2476000"
    },
    {
      label: "2015",
      value: "2832000"
    },
    {
      label: "2016",
      value: "3808000"
    }
  ]
};


// //Not in use..
//    if(this.stdFilter == 'This Week')
//    {
//      const currentDate = new Date(); // Get the current date
//       const currentDay = currentDate.getDay(); // Get the current day of the week (0 is Sunday, 1 is Monday, etc.)

//       // Calculate the date of the first day of the week (Sunday)
//       const firstDay = new Date(currentDate);
//       firstDay.setDate(currentDate.getDate() - currentDay);

//       // Calculate the date of the last day of the week (Saturday)
//       const lastDay = new Date(currentDate);
//       lastDay.setDate(currentDate.getDate() + (6 - currentDay));

//       var startDate = this.timeService.getValidDateString(firstDay);
//       this.from = firstDay;
//       var end = this.timeService.getValidDateString(lastDay);
//       this.to = lastDay
//    }
//    else if(this.stdFilter == "This Year")
//    {
//       var startDateYEar = new Date();
//       startDateYEar.setDate(1);
//       startDateYEar.setMonth(0);
//       var currDate = new Date();
//       currDate.setDate(31);
//       currDate.setMonth(11);
//       var startDate = this.timeService.getValidDateString(startDateYEar);
//       this.from = startDateYEar
//       var end = this.timeService.getValidDateString(currDate);
//       this.to = currDate
//    }
//    else if(this.stdFilter == 'This Month')
//    {
//     var startDay = new Date();
//     startDay.setDate(1);
//     var currDate = new Date();
//     currDate.setMonth(currDate.getMonth() + 1);
//     currDate.setDate(1);
//     currDate.setDate(currDate.getDate() - 1)
//     var startDate = this.timeService.getValidDateString(startDay);
//     this.from = startDay
//     var end = this.timeService.getValidDateString(currDate);
//     this.to = currDate
//    }
//    else if(this.stdFilter == 'Today')
//    {
//       var startDay = new Date();
//       startDay.setHours(0);
//       startDay.setMinutes(0);
//       startDay.setSeconds(0);
//       var endDate = new Date();
//       endDate.setHours(24)
//       endDate.setMinutes(0)
//       endDate.setSeconds(0);
//       var startDate = this.timeService.getValidDateString(startDay);
//       this.from = startDay
//       var end = this.timeService.getValidDateString(endDate);
//       this.to = currDate
//    }
//    else
//    {
//     var start = this.from;
//     var to = this.to;
//     var startDate = this.timeService.getValidDateString(this.from);
//     var end = this.timeService.getValidDateString(this.to)
//    }