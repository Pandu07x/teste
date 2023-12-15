import { Component ,Inject,OnDestroy, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
// import { FusionChartsComponent } from 'angular-fusioncharts';
// import { FusionCharts } from 'dist/assets/js/fusioncharts/js/fusioncharts';
import { NgxSpinnerService } from 'ngx-spinner';
import { BulkData, Variable } from 'src/app/_model/Variables.Model';
import { VariableDashboard, VariableValue } from 'src/app/_model/variableValue.model';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { TestBenchListServiceService } from 'src/app/_services/test-bench-list-service.service';
import variableData2 from 'src/assets/Variables List/AllVariables.Dev.json'

import MasterVariable from 'src/assets/Variables List/Production/MasterPanel.json'
import { FusionchartsComponent } from '../fusioncharts/fusioncharts.component';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnDestroy {
  testBenchList = [
    'TestBench_1',
    'TestBench_2',
    'TestBench_3',
    'TestBench_4',
    'TestBench_5',
    'TestBench_6',
    'TestBench_7',
  ]
  //testBenchStatus2;
  testBenchStatus2 = [
    { Status: false, Group: 'A', Type: 'EODD', ProjectNumber: '123', ProjectName: 'Project A', TestRunCount: 10 },
    { Status: true, Group: 'B', Type: 'AODD', ProjectNumber: '456', ProjectName: 'Project B', TestRunCount: 5 },
    { Status: false, Group: 'A', Type: 'AODD', ProjectNumber: '123', ProjectName: 'Project A', TestRunCount: 10 },
    { Status: false, Group: 'B', Type: 'EODD', ProjectNumber: '456', ProjectName: 'Project B', TestRunCount: 5 },
    { Status: false, Group: 'A', Type: 'AODD', ProjectNumber: '123', ProjectName: 'Project A', TestRunCount: 10 },
    { Status: false, Group: 'B', Type: 'EODD', ProjectNumber: '456', ProjectName: 'Project B', TestRunCount: 5 },
    { Status: false, Group: 'A', Type: 'AODD', ProjectNumber: '123', ProjectName: 'Project A', TestRunCount: 10 },
    // Add more static data as needed
  ];
  showFusionChart: boolean = true;
  testBenchStatus;

  //dataSourceTemperature;
  //dataSourceHumidity;
  showDashBoard = false;
  width = '100%';
  bgColor= '#1d3b55'
  interval;
  height = '130';
 // type = "cylinder";
  type= "angulargauge";
  dataFormat = "json";
  dataSource;
  labEmenrgency:string = ''
  panelEmergency:string = ''
  masterPanelStatus:boolean;
  showCharts = false;
  totalWeeklyObjCount = 0;
  totalYearlyObjCount = 0;
  totalMonthlyObjCount = 0;
  dataSourceOilTank1;
  dataSourceOilTank2;
  dataSourceOilTank3;
  dataSourceOilTank4;
  isAirQualityChartVisible = false
  variables: Variable[] = MasterVariable
  dashData: VariableDashboard = {
    MasterPanel_Status:'',
    LifeBit:'',
    updatedAt:'',
    startTime:'',
    LabAirQualitySPM:0,
    LabAirQualityVOC:0,
    totalRunTime:"",
    timeStamp:"",
    OilTank4Level: "0",
    WaterTankTemp: "0",
    Alarm4: false,
    Alarm3: false,
    Alarm2: false,
    Alarm1: false,
    Alarm5: false,
    LabHumidity: 0,
    OilTank3Temp: "0",
    TBEmergency3_Spare: false,
    WaterTankLevel: "0",
    OilTank1Temp: "0",
    FineDustRoomSensor: "0",
    OilTank2Level: "0",
    OilTank3Level: "0",
    OilTank4Temp: "0",
    LabEmergency: false,
    LabTemp: 0,
    OilTank1Level: "0",
    MPEmergencyShutdownPB: false,
    LabAirQuality: 0,
    OilTank2Temp: '0',
  }
  dataSource2 = data2;
  //dataSource3 = data
  dataSourceAir: any;
  dataSourceTemperature: any;
  dataSourceHumidity: any;
  testStatus =[];
  status = [
    { projName: 'Aodd', testBench: 'Test Bench 1', timeStamp: new Date() },
    { projName: 'EODD', testBench: 'Test Bench 2', timeStamp: new Date() },
    { projName: 'Eodd', testBench: 'Test Bench 1', timeStamp: new Date() },
    { projName: 'Aodd', testBench: 'Test Bench 2', timeStamp: new Date() }
  ];
  constructor(private testBenchService:TestBenchListServiceService,private dashService: DashboardService,
             private spinner: NgxSpinnerService, private dialog: MatDialog) {
    var variabse = variableData2 as Variable[]
    var temp = []
   
    this.spinner.show();
  
    this.dashService.getProjectDetails().subscribe((data)=>{
      if (data) {
        this.testStatus = data;
      } else {
        console.error('Invalid data structure:', data);
      }
    });

    this.interval = setInterval((second)=>{
      this.getTestBench1Status()
      this.getYearlyNu()
      this.getCurrentMonthCount()
      this.getCurrentWeekCount()
      this.initEnvironMentCharts()
      this.getBenchState()
      this.getData()
     
    },5000)

  }
 
  openAirQualityDialog(): void {
    const dialogRef = this.dialog.open(FusionchartsComponent, {
      width:'40vw',  
      height:'30vh',
      data: { dataSourceAir: this.dataSourceAir },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openTempratureDialog(): void {
    const dialogRef = this.dialog.open(FusionchartsComponent, {
      width:'40vw',  
      height:'30vh',
      data: { dataSourceTemperature: this.dataSourceTemperature },
    });
      console.log(this.dataSourceTemperature,'dataSourceTemperature')
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openHumidityDialog(): void {
    const dialogRef = this.dialog.open(FusionchartsComponent, {
      width:'40vw',  
      height:'30vh',
      data: { dataSourceHumidity: this.dataSourceHumidity },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  initEnvironMentCharts()
  {
    var LabAirQualitySPM = this.variables.filter(x => x.variableName == 'LabAirQualitySPM')[0].variableId;
    var LabAirQualityVOC = this.variables.filter(x => x.variableName == 'LabAirQualityVOC')[0].variableId;
    var tempVariableId = this.variables.filter(x => x.variableName == 'LabTemp')[0].variableId;
    var humidityVariableId = this.variables.filter(x => x.variableName == 'LabHumidity')[0].variableId;
    var model111 = [
      {
        "variableId": LabAirQualitySPM,
        "limit": 10,
        "order": "Descending"
      },
      {
        "variableId": LabAirQualityVOC,
        "limit": 10,
        "order": "Descending"
      },
      {
        "variableId": tempVariableId,
        "limit": 10,
        "order": "Descending"
      },
      {
        "variableId": humidityVariableId,
        "limit": 10,
        "order": "Descending"
      },
    ]
    this.dashService.getEnvironMentChart(model111).subscribe((data:BulkData[])=>{
      const LabAirQualitySPM = data[0].data[0].values;
      const LabAirQualityVOC = data[1].data[0].values;
      const dataForTemperature = data[2].data[0].values;
      const dataForhumidity = data[3].data[0].values;
      var dataForSPM = []
      var dataForVoc = []
      
      var dataTemp = []
      var dataHumidity = []

      LabAirQualitySPM.map(x => {
        dataForSPM.push({ value:x.value})
      });

      dataForSPM.reverse()

      LabAirQualityVOC.map(x => {
        dataForVoc.push({ value:x.value})
      });

      dataForVoc.reverse()

      this.initChartAirQuality(dataForSPM , dataForVoc)

      dataForTemperature.map(x => {
        dataTemp.push({ value:x.value})
      });

      dataTemp.reverse()

      this.initTemperatureChart(dataTemp);

      dataForhumidity.map(x => {
        dataHumidity.push({ value:x.value})
      });

      dataHumidity.reverse()

      this.initHumidityChart(dataHumidity)

      
    })
  }

  getTestBench1Status()
  {
    this.testBenchService.getTestBenchRunningStatus().subscribe((data)=>{
      //this.testBenchStatus2 = data;
    })
  }

  // For Air Quality chart
  initChartAirQuality(pumpValue: any[], dpValue: any[]): void 
  {
    const data2 = {
      chart: {
        subcaption: '',
        showhovereffect: "1",
        showLabels: 0,
        showYAxisValues: 0,
        drawcrossline: "1",
        bgColor: "#1d3b55",
        plottooltext: "<b>$seriesName<b>:$dataValue",
        theme: "fusion"
      },
      categories: [
        {
          category: [
          {
            label:''
          },
          {
            label:''
          },
          {
            label:''
          },
          {
            label:''
          },
          {
            label:''
          },
          {
            label:''
          },
          {
            label:''
          },
          {
            label:''
          },
          {
            label:''
          },
          {
            label:''
          },
        ]
        }
      ],
      dataset: [
        {
          seriesname: "SPM",
          data: pumpValue,
          //data: 3
        },
        {
          seriesname: "VOC",
           data: dpValue
          //data: 0.03
        },
      ]
    };

    this.dataSourceAir = data2
  }

  // For Temprature chart
  initTemperatureChart(data: any['23'])
  {
    const data123 = {
      chart: {
        plottooltext: "<div><b>$dataValue",
        theme: "fusion",
        showYAxisValues: 0,
        drawcrossline: "1",
        //plotFillColor: "#642EFF",
        plotFillColor: "#1bd7a6",
        "plotGradientColor": "#ffffff",
        "bgColor": "#1d3b55",
        //Removing default gradient fill from columns
        "usePlotGradientColor": "2",
        "plotFillAngle": "100",
      },
      data: data,
    };

    this.dataSourceTemperature = data123
  }

    // For Humidity chart
  initHumidityChart(data: any[])
  {
    const data123 = {
      chart: {
        plottooltext: "<div><b>$dataValue</b>",
        theme: "fusion",
        'showValues': '0',
        drawcrossline: "1",
        showYAxisValues:0 ,
        //plotFillColor: "#642EFF",
        plotFillColor: "#1bd7a6",
        "bgColor": "#1d3b55",
        "plotGradientColor": "#ffffff",
        //Removing default gradient fill from columns
        "usePlotGradientColor": "2",
        "plotFillAngle": "100",
      },
      data: data,
    };

    this.dataSourceHumidity = data123
  }

  getYearlyNu()
  {
    var startTime = new Date();
    var endtime = new Date();

    startTime.setDate(1);
    startTime.setMonth(0);
    startTime.setHours(0);
    startTime.setMinutes(0);
    startTime.setSeconds(0);
    
    const variableID = this.variables.filter(x => x.variableName == "ProjectId")[0].variableId;

    this.dashService.getTestObjectCount(variableID,startTime, endtime).subscribe({next:(data)=>{
      this.totalYearlyObjCount = data
    },
    error:(err)=>{
      this.totalYearlyObjCount = 0
    }

  });
  }

  getCurrentMonthCount()
  {
    var startTime = new Date();
    startTime.setDate(1)
    startTime.setHours(0)
    startTime.setMinutes(0)
    startTime.setSeconds(0)
    var endDate = new Date();
    const variableID = this.variables.filter(x => x.variableName == "ProjectId")[0].variableId;

    this.dashService.getTestObjectCount(variableID,startTime, endDate).subscribe({next:(data)=>{
      this.totalMonthlyObjCount = data
    },
    error:(err)=>{
      this.totalMonthlyObjCount = 0;
    }
  });
  }

  getCurrentWeekCount()
  {
    var startTime = new Date();
    var currentDay = startTime.getDay();
    if(currentDay !== 0)
    {
     
      startTime.setDate(startTime.getDate()-(currentDay-1))
      startTime.setHours(0)
      startTime.setMinutes(0)
      startTime.setSeconds(0)
      var endDate = new Date()
    const variableID = this.variables.filter(x => x.variableName == "ProjectId")[0].variableId;
      
      this.dashService.getTestObjectCount(variableID,startTime, endDate).subscribe({next:(data)=>{
        this.totalWeeklyObjCount = data
      },
      error:(err)=>{
        this.totalWeeklyObjCount = 0
      }
    });
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  getBenchState()
  {
    this.dashService.getBenchStatus().subscribe({ next:(data)=>{
      this.testBenchStatus = data
    },
    error:(err)=>{
      this.testBenchStatus = {
          running:0,
          available:7
      }
    }
  })
  }

  getData() {
    
    var count = 0;
    for (let i = 0; i < this.variables.length; i++) {

      const variable = this.variables[i];

      this.dashService.getDataByVariableId(variable).subscribe({
        next: (data: VariableValue) => {
          count++;
          var valueName = data.variableName
          if(data.value)
          {
            this.dashData[valueName] = data.value;
            if(data.variableName == 'LabEmergency')
            {
              this.labEmenrgency = data.value
            }
            if(data.variableName == 'MPEmergencyShutdownPB')
            {
              this.panelEmergency = data.value
            }
            if(data.variableName == 'MasterPanel_Status')
            {
              this.masterPanelStatus = data.value
            }
          }
          if (count == this.variables.length ) {
            this.dashData.updatedAt = data.timeStamp
            this.dashService.setNewTimeStamp(data.timeStamp);
            this.showDashBoard = true;
            this.spinner.hide()
            this.showCharts = true
            this.initWaterTankChart()
            this.initOilTank1()
            this.initOilTank2()
            this.initOilTank3()
            this.initOilTank4()
          }
        },
        error: (errr) => {
          count++;
          if (count == this.variables.length ) {
            this.showCharts = true
            this.initWaterTankChart()
            this.initOilTank1()
            this.initOilTank2()
            this.initOilTank3()
            this.initOilTank4()
            this.showDashBoard = true;
            this.spinner.hide()
          }
        }

      })
    }
  }
  // For Quality charts  /////////////////////////////////////////////////////


  //  For Tanks ///////////////////////////////////////////

  initWaterTankChart() {
    var totalCapacity = 100;
   
    var cureentValue = parseFloat(this.dashData.WaterTankLevel).toFixed(2);

    // var percentage = ((cureentValue * 100) / totalCapacity).toFixed(2);
 
    var data = {
      "chart": {
         "caption": "Water Tank-1",
         "captionFontColor": "#fff",
         //"captionFontBold": "1",
         //"subcaption": "Last week",
         "lowerLimit": "0",
         "upperLimit": "100",
         //"showValue": "1",
         "valueBelowPivot": "1",
         "theme": "fusion",
         "bgColor": "#1d3b55",
         "baseFontColor": "#333",
         "chartTopMargin": "",
         //"chartBottomMargin": "70",
         "chartLeftMargin": "0",
         "chartRightMargin": "0",
         "showTickMarks": "0",
         "showTickValues": "0",
         "showLimits": "0",
         "majorTMAlpha": "0",
         "minorTMAlpha": "0",
         "pivotFillAlpha": "0",
         "showPivotBorder": "0",
         "pivotRadius": "0",
         "pivotborderthickness": "0",
        "gaugeouterradius": "100%",
        "gaugeInnerradius": "80%",
         "showGaugeBorder": "0",
         "gaugeFillMix": "{light+0}",
        "showBorder": "0",
        "canvasBgAlpha": "0",
        "transposeAnimation": "1"
      },
      "annotations": {
            "groups": [{
              "items": [
                //     {
                //     "id": "1",
                //     "type": "text",
                //     "text": dayDetail,
                //     "align": "left",
                //     "font": "Nunito Sans",
                //     "bold": "0",
                //     "fontSize": "14",
                //     "color": "#FDFDFD",
                //     "x": "$chartStartX + 15",
                //     "y": "$chartEndY - 20"
                // }, 
                {
                  "id": "2",
                  "type": "text",
                  // "text": `${cureentValue} %`,
                  "text": `${25.00} %`,
                  "align": "center",
                  "bold": "1",
                  "fontSize": "15",
                  "color": "#ffffff",
                  "x": "$chartcenterX",
                  "y": "$chartCenterY + 45"
                }]
            }]
          },
       "colorRange": {
        "color": [{
          "minValue": "0",
          //"maxValue": cureentValue,
          "maxValue": 25.00,
          "code": "#00B2FF"
        },
        {
          "minValue": cureentValue,
          "maxValue": 100,
          "code": "#D3D3D3"
        }
        ]
      },
      "dials": {
            "dial": [{
              //"value": cureentValue,
              "value": 25,
              "alpha": "0",
              "borderAlpha": "0",
              "radius": "0",
              "baseRadius": "0",
              "rearExtension": "0",
              "baseWidth": "0",
              "showValue": "0"
            }]
          }
        }
    this.dataSource = data
  }

  initOilTank1() {
    var totalCapacity = 100;
    var cureentValue = parseFloat(this.dashData.OilTank1Level).toFixed(2);
    // var percentage = ((cureentValue * 100) / totalCapacity).toFixed(2);

    var data = {
      "chart": {
        "caption": "Oil Tank-1 ",
        "captionFontColor": "#fff",
       // "captionFontBold": "1",
        "bgColor": "#1d3b55",
        "theme": "fusion",
        // "subcaption": "Los Angeles Topanga",
        // "setAdaptiveMin": "1",
        "baseFontColor": "#333",
        "chartTopMargin": "",
        // "chartBottomMargin": "70",
        "chartLeftMargin": "0",
        "chartRightMargin": "0",
        "showTickMarks": "0",
        "showTickValues": "0",
        "showLimits": "0",
        "majorTMAlpha": "0",
        "minorTMAlpha": "0",
        "pivotFillAlpha": "0",
        "showPivotBorder": "0",
        "pivotRadius": "0",
        "pivotborderthickness": "0",
        "gaugeouterradius": "100%",
        "gaugeInnerradius": "80%",
        "showGaugeBorder": "0",
        "gaugeFillMix": "{light+0}",
        "showBorder": "0",
        "canvasBgAlpha": "0",
        "transposeAnimation": "1",
      },

      "annotations": {
        "groups": [{
          "items": [
            {
              "id": "2",
              "type": "text",
              "text": `${cureentValue} %`,
              "align": "center",
              "bold": "1",
              "fontSize": "15",
              "color": "#ffffff",
              "x": "$chartcenterX",
              "y": "$chartCenterY + 45"
            }]
        }]
      },

      "colorRange": {
        "color": [{
          "minValue": "0",
          "maxValue": cureentValue,
          "code": "#00B2FF",
          
        },
        {
          "minValue": cureentValue,
          "maxValue": 100,
          "code": "#D3D3D3"
        }
        ]
      },

      "dials": {
        "dial": [{
          "value": this.dashData.OilTank1Level,
          "alpha": "0",
          "borderAlpha": "0",
          "radius": "0",
          "baseRadius": "0",
          "rearExtension": "0",
          "baseWidth": "0",
          "showValue": "0"
        }]
      }
    };
    this.dataSourceOilTank1 = data
  }

  initOilTank2() {

    // var cureentValue = parseFloat(this.dashData.OilTank2Level).toFixed();
    // // var percentage = ((cureentValue * 100) / totalCapacity).toFixed(2);
   
    // var data = {
    //   "chart": {
    //     "caption": "Oil Tank-2 ",
    //     // "subcaption": "Los Angeles Topanga",
    //     // "setAdaptiveMin": "1",
    //     "baseFontColor": "#333",
    //     "chartTopMargin": "",
    //     // "chartBottomMargin": "70",
    //     "chartLeftMargin": "0",
    //     "chartRightMargin": "0",
    //     "showTickMarks": "0",
    //     "showTickValues": "0",
    //     "showLimits": "0",
    //     "majorTMAlpha": "0",
    //     "minorTMAlpha": "0",
    //     "pivotFillAlpha": "0",
    //     "showPivotBorder": "0",
    //     "pivotRadius": "0",
    //     "pivotborderthickness": "0",
    //     "gaugeouterradius": "100%",
    //     "gaugeInnerradius": "80%",
    //     "showGaugeBorder": "0",
    //     "gaugeFillMix": "{light+0}",
    //     "showBorder": "0",
    //     // "bgColor": "#1D1B41",
    //     "bgAlpha": "0",
    //     "canvasBgAlpha": "0",
    //     "transposeAnimation": "1"
    //   },

    //   "annotations": {
    //     "groups": [{
    //       "items": [
    //         {
    //           "id": "2",
    //           "type": "text",
    //           "text": `${cureentValue} %`,
    //           "align": "center",
    //           "bold": "1",
    //           "fontSize": "15",
    //           "color": "#333",
    //           "x": "$chartcenterX",
    //           "y": "$chartCenterY + 45"
    //         }]
    //     }]
    //   },

    //   "colorRange": {
    //     "color": [{
    //       "minValue": "0",
    //       "maxValue": 100,
    //       "code": "#00B2FF"
    //     },
    //     {
    //       "minValue": 100,
    //       "maxValue": 100,
    //       "code": "#D3D3D3"
    //     }
    //     ]
    //   },

    //   "dials": {
    //     "dial": [{
    //       "value": 100,
    //       "alpha": "0",
    //       "borderAlpha": "0",
    //       "radius": "0",
    //       "baseRadius": "0",
    //       "rearExtension": "0",
    //       "baseWidth": "0",
    //       "showValue": "0"
    //     }]
    //   }
    // };
    // this.dataSourceOilTank2 = data

    var totalCapacity = 100;
    var cureentValue = parseFloat(this.dashData.OilTank2Level).toFixed(2);
    // var percentage = ((cureentValue * 100) / totalCapacity).toFixed(2);

    var data = {
      "chart": {
        "caption": "Oil Tank-2 ",
        "captionFontColor": "#fff",
        "theme": "fusion",
        // "subcaption": "Los Angeles Topanga",
        // "setAdaptiveMin": "1",
        "baseFontColor": "#333",
        "chartTopMargin": "",
        // "chartBottomMargin": "70",
        "chartLeftMargin": "0",
        "chartRightMargin": "0",
        "showTickMarks": "0",
        "showTickValues": "0",
        "showLimits": "0",
        "majorTMAlpha": "0",
        "minorTMAlpha": "0",
        "pivotFillAlpha": "0",
        "showPivotBorder": "0",
        "pivotRadius": "0",
        "pivotborderthickness": "0",
        "gaugeouterradius": "100%",
        "gaugeInnerradius": "80%",
        "showGaugeBorder": "0",
        "gaugeFillMix": "{light+0}",
        "showBorder": "0",
        "bgColor": "#1d3b55",
        //"bgAlpha": "0.5",
        "canvasBgAlpha": "0",
        "transposeAnimation": "1"
      },

      "annotations": {
        "groups": [{
          "items": [
            {
              "id": "2",
              "type": "text",
              "text": `${cureentValue} %`,
              "align": "center",
              "bold": "1",
              "fontSize": "15",
              "color": "#ffffff",
              "x": "$chartcenterX",
              "y": "$chartCenterY + 45"
            }]
        }]
      },

      "colorRange": {
        "color": [{
          "minValue": "0",
          "maxValue": cureentValue,
          "code": "#00B2FF"
        },
        {
          "minValue": cureentValue,
          "maxValue": 100,
          "code": "#D3D3D3"
        }
        ]
      },

      "dials": {
        "dial": [{
          "value": this.dashData.OilTank2Level,
          "alpha": "0",
          "borderAlpha": "0",
          "radius": "0",
          "baseRadius": "0",
          "rearExtension": "0",
          "baseWidth": "0",
          "showValue": "0"
        }]
      }
    };
    this.dataSourceOilTank2 = data
  }

  initOilTank3() {
    var cureentValue = parseFloat(this.dashData.OilTank3Level).toFixed(2);
    var data = {
      "chart": {
        "caption": "Oil Tank-3 ",
        "captionFontColor": "#fff",
        // "subcaption": "Los Angeles Topanga",
        // "setAdaptiveMin": "1",
        "baseFontColor": "#333",
        "chartTopMargin": "",
        // "chartBottomMargin": "70",
        "chartLeftMargin": "0",
        "chartRightMargin": "0",
        "showTickMarks": "0",
        "showTickValues": "0",
        "showLimits": "0",
        "majorTMAlpha": "0",
        "minorTMAlpha": "0",
        "pivotFillAlpha": "0",
        "showPivotBorder": "0",
        "pivotRadius": "0",
        "pivotborderthickness": "0",
        "gaugeouterradius": "100%",
        "gaugeInnerradius": "80%",
        "showGaugeBorder": "0",
        "gaugeFillMix": "{light+0}",
        "showBorder": "0",
        "theme": "fusion",
         "bgColor": "#1d3b55",
        //"bgAlpha": "0",
        "canvasBgAlpha": "0",
        "transposeAnimation": "1"
      },

      "annotations": {
        "groups": [{
          "items": [
            {
              "id": "2",
              "type": "text",
              "text": `${cureentValue} %`,
              "align": "center",
              "bold": "1",
              "fontSize": "15",
              "color": "#ffffff",
              "x": "$chartcenterX",
              "y": "$chartCenterY + 45"
            }]
        }]
      },

      "colorRange": {
        "color": [{
          "minValue": "0",
          "maxValue": cureentValue,
          "code": "#00B2FF"
        },
        {
          "minValue": cureentValue,
          "maxValue": 100,
          "code": "#D3D3D3"
        }
        ]
      },

      "dials": {
        "dial": [{
          "value": cureentValue,
          "alpha": "0",
          "borderAlpha": "0",
          "radius": "0",
          "baseRadius": "0",
          "rearExtension": "0",
          "baseWidth": "0",
          "showValue": "0"
        }]
      }
    };
    this.dataSourceOilTank3 = data
  }

  initOilTank4() {
    var totalCapacity = 1000;
    var cureentValue = parseFloat(this.dashData.OilTank4Level).toFixed(2);
    
    var data = {
      "chart": {
        "caption": "Oil Tank-4 ",
        "captionFontColor": "#fff",
        // "subcaption": "Los Angeles Topanga",
        // "setAdaptiveMin": "1",
        "baseFontColor": "#333",
        "chartTopMargin": "",
        // "chartBottomMargin": "70",
        "chartLeftMargin": "0",
        "chartRightMargin": "0",
        "showTickMarks": "0",
        "showTickValues": "0",
        "showLimits": "0",
        "majorTMAlpha": "0",
        "minorTMAlpha": "0",
        "pivotFillAlpha": "0",
        "showPivotBorder": "0",
        "pivotRadius": "0",
        "pivotborderthickness": "0",
        "gaugeouterradius": "100%",
        "gaugeInnerradius": "80%",
        "showGaugeBorder": "0",
        "gaugeFillMix": "{light+0}",
        "showBorder": "0",
        "theme": "fusion",
        "bgColor": "#1d3b55",
        //"bgAlpha": "0",
        "canvasBgAlpha": "0",
        "transposeAnimation": "1"
      },

      "annotations": {
        "groups": [{
          "items": [
            {
              "id": "2",
              "type": "text",
              "text": `${cureentValue} %`,
              "align": "center",
              "bold": "1",
              "fontSize": "15",
              "color": "#ffffff",
              "x": "$chartcenterX",
              "y": "$chartCenterY + 45"
            }]
        }]
      },

      "colorRange": {
        "color": [{
          "minValue": "0",
          "maxValue":cureentValue,
          "code": "#00B2FF"
        },
        {
          "minValue":cureentValue,
          "maxValue": 100,
          "code": "#D3D3D3"
        }
        ]
      },

      "dials": {
        "dial": [{
          "value":cureentValue,
          "alpha": "0",
          "borderAlpha": "0",
          "radius": "0",
          "baseRadius": "0",
          "rearExtension": "0",
          "baseWidth": "0",
          "showValue": "0"
        }]
      }
    };
    this.dataSourceOilTank4 = data
  }

  //  /////////////////////////////////////////////////////////////////

}

const data = {
  "chart": {
    "caption": "Water WT01 ",
    // "subcaption": "Los Angeles Topanga",
    // "setAdaptiveMin": "1",
    "baseFontColor": "#333",
    "chartTopMargin": "",
    // "chartBottomMargin": "70",
    "chartLeftMargin": "0",
    "chartRightMargin": "0",
    "showTickMarks": "0",
    "showTickValues": "0",
    "showLimits": "0",
    "majorTMAlpha": "0",
    "minorTMAlpha": "0",
    "pivotFillAlpha": "0",
    "showPivotBorder": "0",
    "pivotRadius": "0",
    "pivotborderthickness": "0",
    "gaugeouterradius": "100%",
    "gaugeInnerradius": "80%",
    "showGaugeBorder": "0",
    "gaugeFillMix": "{light+0}",
    "showBorder": "0",
    "bgColor": "#1d3b55",
    "bgAlpha": "0",
    "canvasBgAlpha": "0",
    "transposeAnimation": "1"
  },

  "annotations": {
    "groups": [{
      "items": [
        //     {
        //     "id": "1",
        //     "type": "text",
        //     "text": dayDetail,
        //     "align": "left",
        //     "font": "Nunito Sans",
        //     "bold": "0",
        //     "fontSize": "14",
        //     "color": "#FDFDFD",
        //     "x": "$chartStartX + 15",
        //     "y": "$chartEndY - 20"
        // }, 
        {
          "id": "2",
          "type": "text",
          "text": "1.6 %",
          "align": "center",
          "bold": "1",
          "fontSize": "15",
          "color": "#333",
          "x": "$chartcenterX",
          "y": "$chartCenterY + 45"
        }]
    }]
  },

  "colorRange": {
    "color": [{
      "minValue": "0",
      "maxValue": "1.6",
      "code": "#00B2FF"
    },
    {
      "minValue": "1.6",
      "maxValue": "7",
      "code": "#D3D3D3"
    }
    ]
  },

  "dials": {
    "dial": [{
      "value": "1.6",
      "alpha": "0",
      "borderAlpha": "0",
      "radius": "0",
      "baseRadius": "0",
      "rearExtension": "0",
      "baseWidth": "0",
      "showValue": "0"
    }]
  }
};


const data2 = {
  chart: {
    caption: "Lab business of this week",
    theme: "fusion",
    "showBorder": "0",
    "taskBarRoundRadius": "0",
    dateformat: "dd/mm/yyyy",
    plottooltext: "Status for period <b>$start - $end</b> is <b>$label</b>"
  },
  legend: {
    item: [
      {
        label: "In use",
        color: "#62B58D"
      },
      {
        label: "Repair",
        color: "#FFC533"
      },
      {
        label: "Idle",
        color: "#F2726F"
      }
    ]
  },

  tasks: {
    task: [
      {
        label: "In Use",
        processid: "A",
        start: "1/1/2018",
        end: "7/1/2018",
        bordercolor: "#62B58D",
        color: "#62B58D",
        id: "1"
      },
      {
        label: "In Use",
        processid: "A",
        start: "7/1/2018",
        end: "13/1/2018",
        bordercolor: "#F2726F",
        color: "#F2726F",
        id: "1"
      },
      {
        label: "Idle",
        processid: "A",
        start: "13/1/2018",
        end: "18/1/2018",
        bordercolor: "#F2726F",
        color: "#F2726F",
        id: "2"
      },
      {
        label: "In Use",
        processid: "A",
        start: "18/1/2018",
        end: "27/1/2018",
        bordercolor: "#62B58D",
        color: "#62B58D",
        id: "3"
      },
      {
        label: "Repair",
        processid: "A",
        start: "27/1/2018",
        end: "29/1/2018",
        bordercolor: "#FFC533",
        color: "#FFC533",
        id: "4"
      },
      {
        label: "In Use",
        processid: "A",
        start: "29/1/2018",
        end: "4/2/2018",
        bordercolor: "#62B58D",
        color: "#62B58D",
        id: "5"
      },
      {
        label: "Idle",
        processid: "B",
        start: "1/1/2018",
        end: "7/1/2018",
        bordercolor: "#F2726F",
        color: "#F2726F",
        id: "6"
      },
      {
        label: "In Use",
        processid: "B",
        start: "7/1/2018",
        end: "18/1/2018",
        bordercolor: "#62B58D",
        color: "#62B58D",
        id: "7"
      },
      {
        label: "Repair",
        processid: "B",
        start: "18/1/2018",
        end: "24/1/2018",
        bordercolor: "#FFC533",
        color: "#FFC533",
        id: "8"
      },
      {
        label: "In Use",
        processid: "B",
        start: "24/1/2018",
        end: "4/2/2018",
        bordercolor: "#62B58D",
        color: "#62B58D",
        id: "9"
      },
      {
        label: "Idle",
        processid: "C",
        start: "1/1/2018",
        end: "14/1/2018",
        bordercolor: "#F2726F",
        color: "#F2726F",
        id: "10"
      },
      {
        label: "In Use",
        processid: "C",
        start: "14/1/2018",
        end: "3/2/2018",
        bordercolor: "#62B58D",
        color: "#62B58D",
        id: "11"
      },
      {
        label: "Idle",
        processid: "C",
        start: "3/2/2018",
        end: "4/2/2018",
        bordercolor: "#F2726F",
        color: "#F2726F",
        id: "12"
      },
      {
        label: "Repair",
        processid: "D",
        start: "1/1/2018",
        end: "7/1/2018",
        bordercolor: "#FFC533",
        color: "#FFC533",
        id: "13"
      },
      {
        label: "Idle",
        processid: "D",
        start: "7/1/2018",
        end: "11/1/2018",
        bordercolor: "#F2726F",
        color: "#F2726F",
        id: "14"
      },
      {
        label: "In Use",
        processid: "D",
        start: "11/1/2018",
        end: "27/1/2018",
        bordercolor: "#62B58D",
        color: "#62B58D",
        id: "15"
      },
      {
        label: "Repair",
        processid: "D",
        start: "27/1/2018",
        end: "4/2/2018",
        bordercolor: "#FFC533",
        color: "#FFC533",
        id: "16"
      },
      {
        label: "Idle",
        processid: "E",
        start: "1/1/2018",
        end: "18/1/2018",
        bordercolor: "#F2726F",
        color: "#F2726F",
        id: "17"
      },
      {
        label: "In Use",
        processid: "E",
        start: "18/1/2018",
        end: "3/2/2018",
        bordercolor: "#62B58D",
        color: "#62B58D",
        id: "18"
      },
      {
        label: "Idle",
        processid: "E",
        start: "3/2/2018",
        end: "4/2/2018",
        bordercolor: "#F2726F",
        color: "#F2726F",
        id: "19"
      },
      {
        label: "In Use",
        processid: "F",
        start: "1/1/2018",
        end: "8/1/2018",
        bordercolor: "#62B58D",
        color: "#62B58D",
        id: "20"
      },
      {
        label: "Repair",
        processid: "F",
        start: "8/1/2018",
        end: "11/1/2018",
        bordercolor: "#FFC533",
        color: "#FFC533",
        id: "21"
      },
      {
        label: "In Use",
        processid: "F",
        start: "11/1/2018",
        end: "18/1/2018",
        bordercolor: "#62B58D",
        color: "#62B58D",
        id: "22"
      },
      {
        label: "Repair",
        processid: "F",
        start: "18/1/2018",
        end: "21/1/2018",
        bordercolor: "#FFC533",
        color: "#FFC533",
        id: "23"
      },
      {
        label: "Idle",
        processid: "F",
        start: "21/1/2018",
        end: "4/2/2018",
        bordercolor: "#F2726F",
        color: "#F2726F",
        id: "24"
      },
      {
        label: "In Use",
        processid: "G",
        start: "1/1/2018",
        end: "13/1/2018",
        bordercolor: "#62B58D",
        color: "#62B58D",
        id: "25"
      },
      {
        label: "Idle",
        processid: "G",
        start: "13/1/2018",
        end: "20/1/2018",
        bordercolor: "#F2726F",
        color: "#F2726F",
        id: "26"
      },
      {
        label: "In Use",
        processid: "G",
        start: "20/1/2018",
        end: "27/1/2018",
        bordercolor: "#62B58D",
        color: "#62B58D",
        id: "27"
      },
      {
        label: "Repair",
        processid: "G",
        start: "27/1/2018",
        end: "4/2/2018",
        bordercolor: "#FFC533",
        color: "#FFC533",
        id: "28"
      },
      {
        label: "In Use",
        processid: "H",
        start: "1/1/2018",
        end: "8/1/2018",
        bordercolor: "#62B58D",
        color: "#62B58D",
        id: "29"
      },
      {
        label: "Idle",
        processid: "H",
        start: "8/1/2018",
        end: "18/1/2018",
        bordercolor: "#F2726F",
        color: "#F2726F",
        id: "30"
      },
      {
        label: "In Use",
        processid: "H",
        start: "18/1/2018",
        end: "27/1/2018",
        bordercolor: "#62B58D",
        color: "#62B58D",
        id: "31"
      },
      {
        label: "Repair",
        processid: "H",
        start: "27/1/2018",
        end: "29/1/2018",
        bordercolor: "#FFC533",
        color: "#FFC533",
        id: "32"
      },
      {
        label: "In Use",
        processid: "H",
        start: "29/1/2018",
        end: "4/2/2018",
        bordercolor: "#62B58D",
        color: "#62B58D",
        id: "33"
      }
    ]
  },

  processes: {
    isbold: "1",
    headertext: "Test Benches",
    process: [
      {
        label: "Test Bench A",
        id: "A"
      },
      {
        label: "Test Bench B",
        id: "B"
      },
      {
        label: "Test Bench C",
        id: "C"
      },
      {
        label: "Test Bench D",
        id: "D"
      },
      {
        label: "Test Bench E",
        id: "E"
      },
      {
        label: "Test Bench F",
        id: "F"
      },
      {
        label: "Test Bench G",
        id: "G"
      },
      {
        label: "Test Bench H",
        id: "H"
      }
    ]
  },

  categories: [
    {
      category: [
        {
          start: "1/1/2018",
          end: "4/2/2018",
          name: "January 2018"
        }
      ]
    },
    {
      bgalpha: "0",
      category: [
        {
          start: "1/1/2018",
          end: "7/1/2018",
          label: "Week 1"
        },
        {
          start: "8/1/2018",
          end: "14/1/2018",
          label: "Week 2"
        },
        {
          start: "15/1/2018",
          end: "21/1/2018",
          label: "Week 3"
        },
        {
          start: "22/1/2018",
          end: "28/1/2018",
          label: "Week 4"
        },
        {
          start: "29/1/2018",
          end: "4/2/2018",
          label: "Week 5"
        }
      ]
    }
  ]

};

const data123 = {
  chart: {
    plottooltext: "<div><b>$dataValue</b> iPhones sold in $label</div>",
    theme: "fusion",
    'showValues': '0',
    showLabels: 0,
    showYAxisValues: 0,
    plotFillColor: "#642EFF",
    "plotGradientColor": "#ffffff",
    //Removing default gradient fill from columns
    "usePlotGradientColor": "2",
    "plotFillAngle": "100",
  },
  data: [
    {
      value: "100"
    },
    {
      value: "25"
    },
    {
      value: "75"
    },

  ],
};