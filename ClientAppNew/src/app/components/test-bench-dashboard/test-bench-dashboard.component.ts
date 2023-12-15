import { Component, OnDestroy } from '@angular/core';
import variables from 'src/assets/VariablesListGroup_A.json'
import { Variable } from 'src/app/_model/Variables.Model';
import { DashboardService } from 'src/app/_services/dashboard.service';
import { TestbenchDash, VariableValue } from 'src/app/_model/variableValue.model';
import { NgxSpinnerService } from 'ngx-spinner';
// import VariableListA from 'src/assets/Variables List/Development/IOT1-GA.json'
// import VariableListB from 'src/assets/Variables List/Development/IOT2-GB.json'
import { ActivatedRoute } from '@angular/router';

import VariableListA from 'src/assets/Variables List/Production/IOT1-GA.json'
import VariableListB from 'src/assets/Variables List/Production/IOT2-GB.json'
@Component({
  selector: 'app-test-bench-dashboard',
  templateUrl: './test-bench-dashboard.component.html',
  styleUrls: ['./test-bench-dashboard.component.css']
})
export class TestBenchDashboardComponent implements OnDestroy {
  xyz = 1.232434;
  selectedChartType = 'Line';
  type = 'msline';
  type2 = 'msline'
  selectedAgg = 'Today'
  width = '100%';
  chartValues: totalAvgChart[] = [];
  height = '80';
  variableList: Variable[] = []
  // type = "angulargauge";
  dataFormat = "json";
  dataSource;
  dataSourcepRESSURE;
  dataDischargeFlow;
  dataSource2;
  interval;
  testBenchNu;
  showDash = false
  dashData: TestbenchDash = {
    MotorKWH: 0,
    MotorAMP: 0,
    lastUpdated: '',
    DischargePressureBar: 0,
    totalProjectRunTime: '',
    totalRunningHours: '',
    testBenchRunning: '',
    startTime: '',
    timeStamp: '',
    projectTypeString: 'NA',
    projectConfigString: 'NA',
    testingStateString: 'NA',
    ProjectName: 'NA',
    EndTestRunTimeDay: 0,
    DischargePressurePV: 0,
    PumpRPM: 0,
    FcvPos: 0,
    TestRun_ProjectId: 0,
    EndRunMin: 0,
    StrokeCount: 0,
    InAirPressSP: 0,
    ProjectNumber: 0,
    EndTestRunTimeMin: 0,
    ProjectOwner: 'NA',
    EndTestRunTimeHour: 0,
    GravMagSel: false,
    MainTankTempPV: 0,
    AoddInAirSCFMPV: 0,
    DischargePressureSP: 0,
    ProjectId: 0,
    TestBenchNo: 0,
    FineDustRoomSensor: 0,
    FlowGrav: 0,
    ProjectConfig: 0,
    AoddInAirPressPV: 0,
    TestRecipeCount: 0,
    MotorKW: 0,
    ProjectType: 0,
    EndRunHour: 0,
    TestingState: 0,
    EndRunDay: 0,
    FcvSP: 0,
    FlowMag: 0,
    WeightScaleRead: 0,
    MotorRPM: 0,
    SetTestRunTime: 0,
    TestRunCount: 0,
    TestRunTime: 0,
    StrokeCountRate: 0,
    SuctionPressurePV: 0,
    MainTankLTPV: 0,
  }
  Group = this.route.snapshot.paramMap.get('group')
  constructor(private dashService: DashboardService, private spinner: NgxSpinnerService, private route: ActivatedRoute) {
    var Group = this.route.snapshot.paramMap.get('group')
    const TestBenchNu = this.route.snapshot.paramMap.get('testbenchnu')
    if (Group == 'A') {
      this.variableList = VariableListA
    }
    else {
      this.variableList = VariableListB
    }
    this.testBenchNu = TestBenchNu

    this.spinner.show()
    this.interval = setInterval(() => {
      this.getChartData()
      this.getProjectrunTime()
      this.getData();
      this.onChartTypeChange();
    }, 5000)

  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }

  getProjectrunTime() {
    this.dashService.getProjectRunTime(this.Group).subscribe({
      next: (data: number) => {
        const hours = Math.floor(data / 3600);
        const minutes = Math.floor((data % 3600) / 60);
        const remainingSeconds = data % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(remainingSeconds).padStart(2, '0');

        this.dashData.totalProjectRunTime = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
      },
      error: (err) => {

      }
    })
  }

  onChartTypeChange() {
    this.initChart()
  }

  // getData() {
  //   var count = 0;
  //   for (let i = 0; i < this.variableList.length; i++) {
  //     const variable = this.variableList[i]
  //     const testBenchIdVariable = this.variableList.filter( x => x.variableName == 'TestBenchNo')[0].variableId;
  //     this.dashService.getDataByVariableIdTestBench(variable,testBenchIdVariable,this.testBenchNu).subscribe({
  //       next: (data: VariableValue) => {
  //         count++;

  //         if (data.value) {
  //           if (data.variableName == 'TestingState') {
  //             var startDate1 = new Date(data.testStateTimeStamp);
  //             var currDate1 = new Date();
  //             const timeDifferenceMilliseconds1 = currDate1.getTime() - startDate1.getTime();
  //             const hours1 = Math.floor(timeDifferenceMilliseconds1 / 3600000);
  //             const minutes1 = Math.floor((timeDifferenceMilliseconds1 % 3600000) / 60000);
  //             const seconds1 = Math.floor((timeDifferenceMilliseconds1 % 60000) / 1000);

  //             this.dashData.testBenchRunning = `${hours1}:${minutes1}:${seconds1} hms`
  //           }
  //           if (data.variableName == 'ProjectId') {
  //             this.dashData.lastUpdated = data.timeStamp
  //           }

  //           var valueName = data.variableName
  //           if (valueName == 'ProjectType') {
  //             var string1 = this.typeChange(data.value)
  //             this.dashData.projectTypeString = string1
  //           }
  //           if (valueName == 'TestingState') {
  //             var state = this.testingState(data.value)
  //             this.dashData.testingStateString = state
  //           }
  //           if (valueName == 'TestBench1StartStop') {

  //             this.dashData['startTime'] = data.startTime
  //             if (data.startTime != 'NA') {
  //               var startDate = new Date(data.startTime);
  //               var currDate = new Date();

  //               const timeDifferenceMilliseconds = currDate.getTime() - startDate.getTime();
  //               const hours = Math.floor(timeDifferenceMilliseconds / 3600000);
  //               const minutes = Math.floor((timeDifferenceMilliseconds % 3600000) / 60000);
  //               const seconds = Math.floor((timeDifferenceMilliseconds % 60000) / 1000);

  //               this.dashData.totalRunningHours = `${hours}h  ${minutes}m  ${seconds}s`
  //             }
  //             else
  //             {
  //               this.dashData.totalRunningHours = "NA"
  //             }
  //           }
  //           this.dashData[valueName] = data.value
  //         }

  //         if (count == this.variableList.length) {

  //           this.getMoter1()
  //           this.getDischargePressure()
  //           this.getMotor3()
  //           this.spinner.hide()
  //           this.showDash = true;
  //         }
  //       },
  //       error: (err) => {
  //         count++
  //         if (count == this.variableList.length) {

  //           this.getMoter1()
  //           this.getDischargePressure()
  //           this.getMotor3()
  //           this.spinner.hide()
  //           this.showDash = true
  //         }
  //       }
  //     })
  //   }
  // }

  getData() {
    var count = 0;
    for (let i = 0; i < this.variableList.length; i++) {
      const variable = this.variableList[i];
      const testBenchIdVariable = this.variableList.filter(x => x.variableName == 'TestBenchNo')[0]?.variableId;

      this.dashService.getDataByVariableIdTestBench(variable, testBenchIdVariable, this.testBenchNu).subscribe({
        next: (data: VariableValue) => {
          count++;

          if (data && data.value) { // Add a check for 'data' and 'data.value'

            if (data.variableName == 'TestingState') {
              var startDate1 = new Date(data.testStateTimeStamp);
              var currDate1 = new Date();
              const timeDifferenceMilliseconds1 = currDate1.getTime() - startDate1.getTime();
              const hours1 = Math.floor(timeDifferenceMilliseconds1 / 3600000);
              const minutes1 = Math.floor((timeDifferenceMilliseconds1 % 3600000) / 60000);
              const seconds1 = Math.floor((timeDifferenceMilliseconds1 % 60000) / 1000);

              this.dashData.testBenchRunning = `${hours1}:${minutes1}:${seconds1} HH:MM:SS`;
            }

            if (data.variableName == 'ProjectId') {
              this.dashData.lastUpdated = data.timeStamp;
            }

            var valueName = data.variableName;
            if (valueName == 'ProjectType') {
              var string1 = this.typeChange(data.value);
              this.dashData.projectTypeString = string1;
            }

            if (valueName == 'TestingState') {
              var state = this.testingState(data.value);
              this.dashData.testingStateString = state;
            }

            if (valueName == 'TestBench_StartStop') {
              //this.dashData['startTime'] = data.startTime;
              this.dashData['startTime'] = data.startTime;
              if (data.startTime != 'NA') {
                var startDate = new Date(data.startTime);
                var currDate = new Date();

                const timeDifferenceMilliseconds = currDate.getTime() - startDate.getTime();
                const hours = Math.floor(timeDifferenceMilliseconds / 3600000);
                const minutes = Math.floor((timeDifferenceMilliseconds % 3600000) / 60000);
                const seconds = Math.floor((timeDifferenceMilliseconds % 60000) / 1000);

                this.dashData.totalRunningHours = `${hours}h  ${minutes}m  ${seconds}s`;
              } else {
                this.dashData.totalRunningHours = "NA";
              }

            }
            this.dashData[valueName] = data.value;
          }

          if (count == this.variableList.length) {
            this.getMoter1();
            this.getDischargePressure();
            this.getMotor3();
            this.spinner.hide();
            this.showDash = true;
          }
        },
        error: (err) => {
          console.error('Error:', err);
          count++;

          if (count == this.variableList.length) {
            this.getMoter1();
            this.getDischargePressure();
            this.getMotor3();
            this.spinner.hide();
            this.showDash = true;
          }
        }
      });
    }
  }


  getChartData() {
    var currDate = new Date();

    if (this.selectedAgg == 'Today') {
      var startDate = new Date();
      startDate.setHours(0);
      startDate.setMinutes(0);
      startDate.setSeconds(0);
      var endDate = new Date();
      endDate.setHours(24)
      endDate.setMinutes(0)
      endDate.setSeconds(0);
    }

    else if (this.selectedAgg == 'Weekly') {
      const currentDate = new Date(); // Get the current date
      const currentDay = currentDate.getDay(); // Get the current day of the week (0 is Sunday, 1 is Monday, etc.)

      // Calculate the date of the first day of the week (Sunday)
      const firstDay = new Date(currentDate);
      firstDay.setDate(currentDate.getDate() - currentDay);

      // Calculate the date of the last day of the week (Saturday)
      const lastDay = new Date(currentDate);
      lastDay.setDate(currentDate.getDate() + (6 - currentDay));

      var startDate = firstDay;
      var currDate = lastDay;
    }
    else if (this.selectedAgg == 'Yearly') {
      var startDate = new Date();
      startDate.setDate(1);
      startDate.setMonth(0);
      var currDate = new Date();
      currDate.setDate(31);
      currDate.setMonth(11);
    }
    else if (this.selectedAgg == 'Monthly') {
      var startDate = new Date();
      startDate.setDate(1);
      var currDate = new Date();
      currDate.setMonth(currDate.getMonth() + 1);
      currDate.setDate(1);
      currDate.setDate(currDate.getDate() - 1)
    }


    const variablePumpId = this.variableList.filter(x => x.variableName == "PumpRPM")[0]?.variableId;
    const variableDpId = this.variableList.filter(x => x.variableName == "DischargePressurePV")[0]?.variableId;
    const variableDfId = this.variableList.filter(x => x.variableName == "DischargePressureBar")[0]?.variableId;
    const variableMotorAMP = this.variableList.filter(x => x.variableName == "MotorAMP")[0]?.variableId;
    const variableMotorKWH = this.variableList.filter(x => x.variableName == "MotorKWH")[0]?.variableId;
    const testBenchNuId = this.variableList.filter(x => x.variableName == "TestBenchNo")[0]?.variableId;

    var variableList = [variablePumpId, variableDpId, variableDfId, variableMotorAMP, variableMotorKWH, testBenchNuId];


    this.dashService.getTestBenchChart(variableList, startDate, currDate, this.selectedAgg, this.testBenchNu).subscribe({
      next: (data: totalAvgChart[]) => {
        this.chartValues = data;
        this.initChart()
      }
    })
  }

  getVariableId(variableName: string): string | undefined {
    return this.variableList.find(x => x.variableName == variableName)?.variableId;
  }

  initChart() {

    var categoriesMap = []
    var pumpValue = []
    var dpValue = []
    var dfValue = []
    var motorAmpValue = []
    var motorKwhValue = []

    this.chartValues.map(x => {
      var categoryModel = {
        label: x.date
      }
      categoriesMap.push(categoryModel);
      if (this.dashData.testingStateString == 'Running') {
        dpValue.push({ value: x.avgOfDischargePressure });
        pumpValue.push({ value: x.avgOfPumpRpm });
        dfValue.push({ value: x.avgOfDischargeFlow });
        motorAmpValue.push({ value: x.avgmotorAmpData });
        motorKwhValue.push({ value: x.avgmotorKwhData });
      }
      else {
        dpValue.push({ value: 0 });
        pumpValue.push({ value: 0 });
        dfValue.push({ value: 0 });
        motorAmpValue.push({ value: 0 });
        motorKwhValue.push({ value: 0 });
      }
    })

    const data2 = {
      chart: {
        subcaption: this.selectedAgg,
        showhovereffect: "1",
        drawcrossline: "1",
        plottooltext: "<b>$seriesName<b>:$dataValue",
        theme: "fusion"
      },

      categories: [
        {
          category: categoriesMap
        }
      ],
      dataset: [
        {
          seriesname: "Pump RPM",
          data: pumpValue
        },
        {
          seriesname: "Discharge Pressure",
          data: dpValue
        },
        {
          seriesname: "Discharge Flow",
          data: dfValue
        },
        {
          seriesname: "Motor Current",
          data: motorAmpValue
        },
        {
          seriesname: "Energy",
          data: motorKwhValue
        },
      ]
    };

    this.dataSource2 = data2

  }

  onAggChange() {
    this.getChartData()
  }

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

  testingState(num): string {
    if (num == 0) {
      return 'Idle'
    }
    else if (num == 1) {
      return 'Starting'

    }
    else if (num == 2) {
      return 'Running'

    }
    else if (num == 3) {
      return 'Holding'

    }
    else if (num == 4) {

      return 'Hold'
    }
    else if (num == 5) {
      return 'Resuming'

    }
    else if (num == 6) {
      return 'Stopping'
    }
    else if (num == 7) {
      return 'Stop'
    }
    return ''

  }

  getMoter1() {
    var totalCapacity = 1000;
    var percentage;
    if (this.dashData.testingStateString == "Running") {
      percentage = parseFloat(this.dashData.PumpRPM.toString()).toFixed(2);
    }
    else {
      percentage = 0
    }
    const data = {
      "chart": {
        // "subcaption": "Los Angeles Topanga",
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
        "gaugeouterradius": "60",
        "gaugeInnerradius": "50",
        "showGaugeBorder": "0",
        "gaugeFillMix": "{light+0}",
        "showBorder": "0",
        // "bgColor": "#1D1B41",
        "bgAlpha": "0",
        "canvasBgAlpha": "0",
        "transposeAnimation": "1"
      },

      "annotations": {
        "groups": [{
          "items": [
            {
              "id": "2",
              "type": "text",
              "text": percentage,
              "align": "center",
              "bold": "1",
              "fontSize": "18",
              "color": "#333",
              "x": "$chartcenterX",
              "y": "$chartCenterY + 20"
            }]
        }]
      },

      "colorRange": {
        "color": [{
          "minValue": "0",
          "maxValue": percentage,
          "code": "#00B2FF"
        },
        {
          "minValue": percentage,
          "maxValue": "200",
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

    this.dataSource = data
  }

  getDischargePressure() {
    var totalCapacity = 1000;
    var percentage;
    if (this.dashData.testingStateString == "Running") {
      percentage = parseFloat(this.dashData.DischargePressurePV.toString()).toFixed(2);
    }
    else {
      percentage = 0
    }

    const data = {
      "chart": {
        // "subcaption": "Los Angeles Topanga",
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
        "gaugeouterradius": "60",
        "gaugeInnerradius": "50",
        "showGaugeBorder": "0",
        "gaugeFillMix": "{light+0}",
        "showBorder": "0",
        // "bgColor": "#1D1B41",
        "bgAlpha": "0",
        "canvasBgAlpha": "0",
        "transposeAnimation": "1"
      },

      "annotations": {
        "groups": [{
          "items": [
            {
              "id": "2",
              "type": "text",
              "text": percentage,
              "align": "center",
              "bold": "1",
              "fontSize": "18",
              "color": "#333",
              "x": "$chartcenterX",
              "y": "$chartCenterY + 20"
            }]
        }]
      },

      "colorRange": {
        "color": [{
          "minValue": "0",
          "maxValue": this.dashData.DischargePressureSP,
          "code": "#00B2FF"
        },
        {
          "minValue": this.dashData.DischargePressureSP,
          "maxValue": "10",
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

    this.dataSourcepRESSURE = data
  }

  getMotor3() {
    var percentage
    if (this.dashData.testingStateString == "Running") {
      //var d=this.dashData.DischargePressureBar/10
      percentage = parseFloat(this.dashData.DischargePressureBar.toString()).toFixed(2);
    }
    else {
      percentage = 0
    }
    const data = {
      "chart": {
        // "subcaption": "Los Angeles Topanga",
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
        "gaugeouterradius": "60",
        "gaugeInnerradius": "50",
        "showGaugeBorder": "0",
        "gaugeFillMix": "{light+0}",
        "showBorder": "0",
        // "bgColor": "#1D1B41",
        "bgAlpha": "0",
        "canvasBgAlpha": "0",
        "transposeAnimation": "1"
      },

      "annotations": {
        "groups": [{
          "items": [
            {
              "id": "2",
              "type": "text",
              "text": percentage,
              "align": "center",
              "bold": "1",
              "fontSize": "18",
              "color": "#333",
              "x": "$chartcenterX",
              "y": "$chartCenterY + 20"
            }]
        }]
      },

      "colorRange": {
        "color": [{
          "minValue": "0",
          "maxValue": percentage,
          "code": "#00B2FF"
        },
        {
          "minValue": percentage,
          "maxValue": "10",
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
    this.dataDischargeFlow = data
  }
}



export interface totalAvgChart {
  date: string
  avgOfPumpRpm: number
  avgOfDischargePressure: number
  avgOfDischargeFlow: number
  avgmotorAmpData: number
  avgmotorKwhData: number
}