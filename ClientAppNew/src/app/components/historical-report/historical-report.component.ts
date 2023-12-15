import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { BulkData, Variable } from 'src/app/_model/Variables.Model';
import { ColumnMaster, FilterTemplateDto } from 'src/app/_model/report.model';
import { ReportServicesService } from 'src/app/_services/report-services.service';
//import variableData from 'src/assets/chart.report.temp.json'
import variableData from 'src/assets/Variables List/Production/GraphVar.json'
import { DashboardService } from 'src/app/_services/dashboard.service';
import { environment } from 'src/environments/environment';
//import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-historical-report',
  templateUrl: './historical-report.component.html',
  styleUrls: ['./historical-report.component.css']
})
export class HistoricalReportComponent {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
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
  variableList: Variable[] = variableData;
  tableData = [];
  constructor(private http: HttpClient, private timeService: DashboardService, private dialog: MatDialog, private fb: FormBuilder, private toast: ToastrService, private spinner: NgxSpinnerService, private reportService: ReportServicesService) {
    
    
    var variables = this.variableList.filter(x => x.dataType != 'String' && x.dataType != "Bool")
    variables.map(x => {
      var model: ColumnMaster = {
        columnName: x.variableName,
      }
      this.listOfCols.push(model);
    })


    this.formData = fb.group({
      tableArray: fb.array([])
    });

    reportService.getRoles().subscribe()
  }
  listOfProjId = []


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

  columnsToDisplay = ['Project Id', 'Project Number', 'Project Name','Owner Name' ,'Start Time', 'End time' ,'Test Bench','Configuration']

  onChartTypeChange() {
    this.initChart()
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
    var variableprojId = this.variableList.filter(x => x.variableName == 'ProjectId')[0].variableId
    var variableNumber = this.variableList.filter(x => x.variableName == 'ProjectNumber')[0].variableId
    var variableName = this.variableList.filter(x => x.variableName == 'ProjectName')[0].variableId
    var variableOwner = this.variableList.filter(x => x.variableName == 'ProjectOwner')[0].variableId
    var variableTestNo = this.variableList.filter(x => x.variableName == 'TestBenchNo')[0].variableId
    var variableConfig = this.variableList.filter(x => x.variableName == 'ProjectConfig')[0].variableId
    var variableType = this.variableList.filter(x => x.variableName == 'ProjectType')[0].variableId

    var listOfvar = [variableprojId,variableNumber,variableName,variableOwner,variableTestNo,variableConfig, variableType]

   if(this.stdFilter == 'This Week')
   {
     const currentDate = new Date(); // Get the current date
      const currentDay = currentDate.getDay(); // Get the current day of the week (0 is Sunday, 1 is Monday, etc.)

      // Calculate the date of the first day of the week (Sunday)
      const firstDay = new Date(currentDate);
      firstDay.setDate(currentDate.getDate() - currentDay);

      // Calculate the date of the last day of the week (Saturday)
      const lastDay = new Date(currentDate);
      lastDay.setDate(currentDate.getDate() + (6 - currentDay));

      var startDate = this.timeService.getValidDateString(firstDay);
      this.from = firstDay;
      var end = this.timeService.getValidDateString(lastDay);
      this.to = lastDay
   }
   else if(this.stdFilter == "This Year")
   {
      var startDateYEar = new Date();
      startDateYEar.setDate(1);
      startDateYEar.setMonth(0);
      var currDate = new Date();
      currDate.setDate(31);
      currDate.setMonth(11);
      var startDate = this.timeService.getValidDateString(startDateYEar);
      this.from = startDateYEar
      var end = this.timeService.getValidDateString(currDate);
      this.to = currDate
   }
   else if(this.stdFilter == 'This Month')
   {
    var startDay = new Date();
    startDay.setDate(1);
    var currDate = new Date();
    currDate.setMonth(currDate.getMonth() + 1);
    currDate.setDate(1);
    currDate.setDate(currDate.getDate() - 1)
    var startDate = this.timeService.getValidDateString(startDay);
    this.from = startDay
    var end = this.timeService.getValidDateString(currDate);
    this.to = currDate
   }
   else if(this.stdFilter == 'Today')
   {
      var startDay = new Date();
      startDay.setHours(0);
      startDay.setMinutes(0);
      startDay.setSeconds(0);
      var endDate = new Date();
      endDate.setHours(24)
      endDate.setMinutes(0)
      endDate.setSeconds(0);
      var startDate = this.timeService.getValidDateString(startDay);
      this.from = startDay
      var end = this.timeService.getValidDateString(endDate);
      this.to = currDate
   }
   else
   {
    var start = this.from;
    var to = this.to;
    var startDate = this.timeService.getValidDateString(this.from);
    var end = this.timeService.getValidDateString(this.to)
   }
   
    var model123 = []
    for(let i4 = 0 ; i4 < listOfvar.length;i4++)
    {
      model123.push({
        "variableId": listOfvar[i4],
        "order": 'Descending',
        "from": startDate,
        "to": end,
        "limit":50
      })
    }

    var url =`DataService/Data/Bulk/Read`;
    var model = {
      "url":url,
      "json":model123
    }
      
    
    // return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, model123).subscribe({
    //   next: (data: BulkData[]) => {
    //     data[0].data[0].values.map((x, i) => {
    //       if (this.typeChange(data[6].data[0].values[i].value) == this.type2) {
    //         if (!this.listOfProjId.includes(x.value.toString())) {
    //           this.reportService.getProjectRunTime(data[0].data[0].values[i].value).subscribe((data2)=>{
    //             var model2 = {
    //               projectId: x.value,
    //               projectNumber:data[1].data[0].values[i].value,
    //               projectName:data[2].data[0].values[i].value,
    //               projectOwnwer:data[3].data[0].values[i].value,
    //               projectTestNo:data[4].data[0].values[i].value,
    //               projectConfig:data[5].data[0].values[i].value,
    //               projectEndTime:data2,
    //               startTime: x.timestamp
    //             }
    //             this.tableData.push(model2)
    //             this.dataSource123.data = this.tableData
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


    return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model).subscribe({
      next: (data: BulkData[]) => {
       
        this.spinner.hide();

        data[0].data[0].values.map((x, i) => {
          if (this.typeChange(data[6].data[0].values[i].value) == this.type2) {
            if (!this.listOfProjId.includes(x.value.toString())) {
              this.reportService.getProjectRunTime(data[0].data[0].values[i].value).subscribe((data2)=>{
               
                var model2 = {
                  projectId: x.value,
                  projectNumber:data[1].data[0].values[i].value,
                  projectName:data[2].data[0].values[i].value,
                  projectOwnwer:data[3].data[0].values[i].value,
                  projectTestNo:data[4].data[0].values[i].value,
                  projectConfig:data[5].data[0].values[i].value,
                  projectEndTime:data2,
                  startTime: x.timestamp
                }
                this.tableData.push(model2)
                this.dataSource123.data = this.tableData
              })
            }     
          }
          
        });
        
        this.spinner.hide()
        return data
      },
      error: (err) => {
        this.spinner.hide()
      }
    });

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

  assignProjectId(projectId, from, to ) {
    
    this.spinner.show()
    this.category = []
    this.dataSet = []
    var models = []
    var cols = ['ProjectId']
    var startDate = new Date(from);
    startDate.setHours(startDate.getHours()-5)
    startDate.setMinutes(startDate.getMinutes()-30)
    var endDate = new Date(to);
    endDate.setHours(endDate.getHours()-5)
    endDate.setMinutes(endDate.getMinutes()-30)
   
    cols.push(...this.toppings.value)
    cols.map(x => {
      var md = {
        "variableId": this.variableList.filter(y => y.variableName == x)[0].variableId,
        "order": 'Ascending',
        "from": this.timeService.getValidDateString(startDate),
        "to": this.timeService.getValidDateString(endDate),
        "limit":100
      }
      models.push(md)
    })
    
    this.projectId = projectId;
    


    this.reportService.getTableData(models).subscribe((data: BulkData[]) => {
      data[1].data[0].values.map(y => {
        var timeStamp = new Date(y.timestamp)
        var timeStamoString = timeStamp.getHours()+":"+timeStamp.getMinutes()+":"+timeStamp.getSeconds()
        this.category.push({label: timeStamoString})
      })
    
      data.map((x, i) => {
        if (i != 0) {
          var model5545 = {
            seriesname: cols[i],
            data: []
          }

          x.data[0].values.map(z => {
            model5545.data.push( {value: z.value ? z.value : 0});
          })
          this.dataSet.push(model5545);
        }
      })
   
      this.initChart()
    })
  }

  initChart() {
    const data2 = {
      chart: {
        showhovereffect: "1",
        yAxisName:'Average',
        drawcrossline: "1",
        plottooltext: "<b>$seriesName<b>:$dataValue",
        theme: "fusion",
        exportEnabled:1
      },

      categories: [
        {
          category: this.category
        }
      ],
      dataset: this.dataSet
    };

    this.chartData = data2
    this.spinner.hide()
  }



}

