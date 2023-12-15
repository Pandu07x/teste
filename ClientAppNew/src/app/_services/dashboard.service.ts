import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BulkData, Variable, VariableReceived } from '../_model/Variables.Model';
import { BehaviorSubject, ConnectableObservable, map } from 'rxjs';
import { VariableValue } from '../_model/variableValue.model';
//import variableDataA from 'src/assets/VariablesListGroup_A.json';
import variableDataA from 'src/assets/Variables List/Production/AllVariable.json';
import { MainDashboardComponent } from '../components/main-dashboard/main-dashboard.component';
import { MatDialog } from '@angular/material/dialog';


// IP1GB_TestingState

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseUrl = environment.Edge_Url;
  apiUrl = environment.API_URL;
  variableList: Variable[] =variableDataA;

  timeStamp = new BehaviorSubject(null);
  subject = this.timeStamp.asObservable()

  constructor(private http: HttpClient, private datePipe: DatePipe, private dialog: MatDialog) { }

  setNewTimeStamp(date)
  {
    this.timeStamp.next(date);
  }

  getDataByVariableId(variable: Variable) {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 30);
    var endDate = new Date();
   
    var  timeString = this.getDateString(startTime, endDate) + '&limit=1&order=Descending'

    if (environment.production) {
      var url = `DataService/Data/${variable.variableId}?${timeString}`;
      var model = {
        url: url
      };
      return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id`, model).pipe(map((data: any) => {
        var model: VariableValue = {
          value: '0',
          variableName: '',
          timeStamp: '',
          startTime: '',
          testStateTimeStamp: ''
        };
        const variableData = data.data as VariableReceived[]
        if (variable.variableName == 'TestBench_StartStop') {
          if (variableData[0]?.values[0]?.value == true) {
            model.startTime = variableData[0]?.values[0]?.timestamp.toString();
          }
        }
       
        if (variable.variableName == 'TestingState') {
          model.testStateTimeStamp = variableData[0]?.values[0]?.timestamp.toString();
        }
        model.variableName = variable.variableName
        model.value = variableData[0]?.values[0]?.value.toString();
        model.timeStamp = variableData[0]?.values[0]?.timestamp.toString();
        return model
      }));
    }
    else {
      return this.http.get(`${this.baseUrl}DataService/Data/${variable.variableId}?${timeString}`).pipe(map((data: any) => {
        
        var model: VariableValue = {
          value: '0',
          variableName: '',
          timeStamp: '',
          startTime: '',
          testStateTimeStamp: ''
        };
        const variableData = data.data as VariableReceived[]
        if (variable.variableName == 'TestBench1StartStop') {
          if (variableData[0]?.values[0]?.value == true) {
            model.startTime = variableData[0]?.values[0]?.timestamp.toString();
          }
        }
       
        if (variable.variableName == 'TestingState') {
          model.testStateTimeStamp = variableData[0]?.values[0]?.timestamp.toString();
        }
        model.variableName = variable.variableName
        model.value = variableData[0]?.values[0]?.value.toString();
        model.timeStamp = variableData[0]?.values[0]?.timestamp.toString();
        return model
      }));
    }
  }

  // getDataByVariableIdTestBench(variable: Variable, testBEnchID,testBenchNu) {
   
  //   var startTime = new Date();
  //   startTime.setDate(startTime.getDate() - 30);
  //   var endDate = new Date();
  //   var model111 = [
  //     {
  //       "variableId": testBEnchID,
  //       "order": "Descending"
  //     },
  //     {
  //       "variableId":variable.variableId,
  //       "order": "Descending"
  //     },
  //   ]

  //   var  timeString = this.getDateString(startTime, endDate) + '&limit=1&order=Descending'

  //   if (environment.production) {
  //     var url = `DataService/Data/Bulk/Read`;
  //     var model = {
  //       url: url,
  //       json:model111
  //     };
  //     return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model).pipe(map((data: any) => {
  //       console.log(data, 'data')
  //       const variableData = data[1].data[0].values;
       
  //       var model: VariableValue = {
  //         value: 'NA',
  //         variableName: 'NA',
  //         timeStamp: 'NA',
  //         startTime: 'NA',
  //         testStateTimeStamp: 'NA'
  //       };
  //       for(let i =0 ; i< variableData.length;i++)
  //       {
  //         const testBEnchNu = data[0].data[0].values[i].value;
          
  //         if(testBEnchNu == testBenchNu)
  //         {  
         
  //           if (variable.variableName == 'TestBench1StartStop') {
           
  //             if (variableData[i].value == true) {
  //               model.startTime = variableData[i]?.timestamp.toString();
  //             }
  //           }
            
  //           if (variable.variableName == 'TestingState') {
  //             model.testStateTimeStamp = variableData[i]?.timestamp.toString();
  //           }
  //           model.variableName = variable.variableName
  //           model.value = variableData[i]?.value.toString();
  //           model.timeStamp = variableData[i]?.timestamp.toString();
            
  //           return model
  //         }
  //       }
  //      // console.log(model, 'model return')
  //       return model;
  //     }));
  //   }
  //   else {
  //     return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, model111).pipe(map((data: BulkData[]) => {
  //       const variableData = data[1].data[0].values;
  //       var model: VariableValue = {
  //         value: 'NA',
  //         variableName: 'NA',
  //         timeStamp: 'NA',
  //         startTime: 'NA',
  //         testStateTimeStamp: 'NA'
  //       };
  //       for(let i =0 ; i< variableData.length;i++)
  //       {
  //         const testBEnchNu = data[0].data[0].values[i].value;
          
  //         if(testBEnchNu == testBenchNu)
  //         {  
         
  //           if (variable.variableName == 'TestBench1StartStop') {
           
  //             if (variableData[i].value == true) {
  //               model.startTime = variableData[i]?.timestamp.toString();
  //             }
  //           }
            
  //           if (variable.variableName == 'TestingState') {
  //             model.testStateTimeStamp = variableData[i]?.timestamp.toString();
  //           }
  //           model.variableName = variable.variableName
  //           model.value = variableData[i]?.value.toString();
  //           model.timeStamp = variableData[i]?.timestamp.toString();
  //           return model
  //         }
  //       }
  //       return model;
  //     }));
  //   }
  // }
  
  getDataByVariableIdTestBench(variable: Variable, testBEnchID, testBenchNu) {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 30);
    var endDate = new Date();
    var model111 = [
      {
        "variableId": testBEnchID,
        "order": "Descending",
        "limit": 1
      },
      {
        "variableId": variable.variableId,
        "order": "Descending",
        "limit": 1
      },
    ];
  
    var timeString = this.getDateString(startTime, endDate) + '&limit=1&order=Descending';
  
    if (environment.production) {
      var url = `DataService/Data/Bulk/Read`;
      var model = {
        url: url,
        json: model111
      };
      return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model).pipe(map((data: any) => {
     
        const variableData = data[1]?.data[0]?.values || [];
        var model: VariableValue = {
          value: 'NA',
          variableName: 'NA',
          timeStamp: 'NA',
          startTime: 'NA',
          testStateTimeStamp: 'NA'
        };
  
        for (let i = 0; i < variableData.length; i++) {
          const testBEnchNu = data[0]?.data[0]?.values[i]?.value;
        
          if (testBEnchNu == testBenchNu) {
            if (variable.variableName == 'TestBench_StartStop' && variableData[i]?.value == true) {
             
              model.startTime = variableData[i]?.timestamp?.toString();
            }
            // else if(variable.variableName == 'TestBench_StartStop' && variableData[i]?.value == false) {
            //   model.startTime = variableData[i]?.timestamp?.toString();
            //   console.log( model.startTime,'false')
            // }
  
            if (variable.variableName == 'TestingState') {
              model.testStateTimeStamp = variableData[i]?.timestamp?.toString();
            }
            model.variableName = variable.variableName
            model.value = variableData[i]?.value?.toString();
            model.timeStamp = variableData[i]?.timestamp?.toString();
  
            return model
          }
        }
        return model;
      }));
    }
    else {
      return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, model111).pipe(map((data: BulkData[]) => {
        const variableData = data[1]?.data[0]?.values || [];
        var model: VariableValue = {
          value: 'NA',
          variableName: 'NA',
          timeStamp: 'NA',
          startTime: 'NA',
          testStateTimeStamp: 'NA'
        };
        for (let i = 0; i < variableData.length; i++) {
          const testBEnchNu = data[0]?.data[0]?.values[i]?.value;
  
          if (testBEnchNu == testBenchNu) {
  
            if (variable.variableName == 'TestBench_StartStop') {
  
              if (variableData[i]?.value == true) {
                model.startTime = variableData[i]?.timestamp?.toString();
              }
            }
  
            if (variable.variableName == 'TestingState') {
              model.testStateTimeStamp = variableData[i]?.timestamp?.toString();
            }
            model.variableName = variable.variableName
            model.value = variableData[i]?.value?.toString();
            model.timeStamp = variableData[i]?.timestamp?.toString();
            return model
          }
        }
        return model;
      }));
    }
  }
  

  getEnvironMentChart(model111)
  {
    if (environment.production) {

      var url = `DataService/Data/Bulk/Read`

      var model = {
        url: url,
        json: model111
      }

      return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model).pipe(map((data: any) => {

        return data
      }));
     
    }
    else {
      return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, model111).pipe(map((data: BulkData[]) => {
   
        return data
      }));
    }

  }

  // getProjectDetails() {
  //   var startTime = new Date();
  //   startTime.setDate(startTime.getDate() - 30);
  //   var endDate = new Date()
  //   var timeString = this.getDateString(startTime, endDate) + '&limit=1&order=Descending'

  //   if (environment.production) {
  //     var model111 = [
  //       {
  //         "variableId": "5de44768eaa842658cd93e8fb0a27d8b",
  //         "limit": 5,
  //         "order": "Descending"
  //       },
  //       {
  //         "variableId": "506e7de4ef624c2799f581f6b64e0da8",
  //         "limit": 5,
  //         "order": "Descending"

  //       },
  //       {
  //         "variableId": "54510db1be114e59b4306411af97d976",
  //         "limit": 5,
  //         "order": "Descending"

  //       },
  //     ]

  //     var url = `DataService/Data/Bulk/Read`

  //     var model = {
  //       url: url,
  //       json: model111
  //     }

  //     return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model).pipe(map((data: any) => {

        
  //       var listofmodel = [];

  //       for (let i = 0; i < 5; i++) {
  //         var mode = {
  //           projName: '',
  //           testBench: '',
  //           timeStamp: ''
  //         }
  //         data.map((x, i2) => {
  //           if (i2 == 0) {

  //             mode.timeStamp = x.data[0].values[i].timestamp
  //           }
  //           else if (i2 == 1) {
  //             mode.projName = x.data[0].values[i].value
  //           }
  //           else if (i2 == 2) {
  //             mode.testBench = 'Test Bench' + ' ' + x.data[0].values[i].value
  //           }
  //         })
  //         listofmodel.push(mode)
  //       }
       
  //       return listofmodel
  //     }));
  //   }
  //   else {
  //     var model111 = [
  //       {
  //         "variableId": "5313b472ce34461b850e1282f58e15c4",
  //         "limit": 5,
  //         "order": "Descending"
  //       },
  //       {
  //         "variableId": "75df75a2f5864eae82621aeb9b535394",
  //         "limit": 5,
  //         "order": "Descending"

  //       },
  //       {
  //         "variableId": "532d667c37ec4c97af8de63272cc5bf8",
  //         "limit": 5,
  //         "order": "Descending"
  //       }
        
  //     ]

  //     return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, model111).pipe(map((data: any[]) => {
  //       var listofmodel = []

  //       for (let i = 0; i < 5; i++) {
  //         var mode = {
  //           projName: '',
  //           testBench: '',
  //           timeStamp: ''
  //         }
  //         data.map((x, i2) => {
  //           if (i2 == 0) {

  //             mode.timeStamp = x.data[0].values[i].timestamp
  //           }
  //           else if (i2 == 1) {
  //             mode.projName = x.data[0].values[i].value
  //           }
  //           else if (i2 == 2) {
  //             mode.testBench = 'Test Bench' + ' ' + x.data[0].values[i].value
  //           }
  //         })
         
  //         listofmodel.push(mode)
  //       }
  //       return listofmodel
  //     }));
  //   }
  // }


  //Get Last 5 Tech run data on Main Dashboard
  getProjectDetails() {
    var startTime = new Date();
    startTime.setDate(startTime.getDate() - 30);
    var endDate = new Date()
    var timeString = this.getDateString(startTime, endDate) + '&limit=1&order=Descending'
  
    if (environment.production) {
      var model111 = [
        {
          "variableId": "5de44768eaa842658cd93e8fb0a27d8b",
          "limit": 5,
          "order": "Descending"
        },
        {
          "variableId": "506e7de4ef624c2799f581f6b64e0da8",
          "limit": 5,
          "order": "Descending"

        },
        {
          "variableId": "54510db1be114e59b4306411af97d976",
          "limit": 5,
          "order": "Descending"

        }
       
      ]
      var url = `DataService/Data/Bulk/Read`
  
      var model = {
        url: url,
        json: model111
      }
  
      return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model).pipe(map((data: any) => {
        var listofmodel = [];
  
        for (let i = 0; i < 5; i++) {
          var mode = {
            projName: '',
            testBench: '',
            timeStamp: ''
          };
         
          

      if(data[0].data[0].values[i].value !="")
      {
          if (data.length > 0 && data[0].data[0].values.length > i ) {
              mode.timeStamp = data[0].data[0].values[i].timestamp;
          }
  
          if (data.length > 1 && data[1].data[0].values.length > i) {
            mode.projName = data[1].data[0].values[i].value;
          }
  
          if (data.length > 2 && data[2].data[0].values.length > i && data[2].data[0].values[i].value > 0) {
            mode.testBench = 'Test Bench' + ' ' + data[2].data[0].values[i].value;
          }
        
          listofmodel.push(mode);
        
      }
    }
        return listofmodel;
      }));


    } 
    
    else {
      var model111 = [
        {
          "variableId": "5313b472ce34461b850e1282f58e15c4",
          "limit": 5,
          "order": "Descending"
        },
        {
          "variableId": "75df75a2f5864eae82621aeb9b535394",
          "limit": 5,
          "order": "Descending"

        },
        {
          "variableId": "532d667c37ec4c97af8de63272cc5bf8",
          "limit": 5,
          "order": "Descending"
        }
        
      ]

      return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, model111).pipe(map((data: any[]) => {
        var listofmodel = [];
  
        for (let i = 0; i < 5; i++) {
          var mode = {
            projName: '',
            testBench: '',
            timeStamp: ''
          };
  
          if (data.length > 0 && data[0].data[0].values.length > i) {
            mode.timeStamp = data[0].data[0].values[i].timestamp;
          }
  
          if (data.length > 1 && data[1].data[0].values.length > i) {
            mode.projName = data[1].data[0].values[i].value;
          }
  
          if (data.length > 2 && data[2].data[0].values.length > i) {
            mode.testBench = 'Test Bench' + ' ' + data[2].data[0].values[i].value;
          }
  
          listofmodel.push(mode);
        }
  
        return listofmodel;
      }));
    }
  }

  //..........End..........Get last 5 Test run on Dashboard
  

  getTestBenchChart123(variableList: string[], from1: Date, to1: Date, filterType, benchNu) {
    var modelList = [];
      var from = this.getValidDateString(from1);
      var to = this.getValidDateString(to1);
      for (let i = 0; i < variableList.length; i++) {
        var model = {
          "variableId": variableList[i],
          "order": 'Descending',
          "from": from,
          "to": to
        }
        modelList.push(model);
      }
    // Variable list ['Pump RPM','Discharge Pressure','DischargeFlow']
    if(environment.production)
    {
      return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model).pipe(map((data: any) => {
        var pumpRpmData = data[0];
        var dischargePressureData = data[1];
        var dischargeFlowData = data[2];
        var motorAmpData = data[3];
        var motorKwhData = data[4];
        var testBenchNu = data[5]
        var listofmodel = []

        if (filterType == 'Weekly') {
          const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
          var startDate = from1;
          var nextDate = new Date(from1);
          nextDate.setDate(nextDate.getDate() + 1);
          var endDate = to1;
          while (startDate.getTime() <= endDate.getTime()) {

            var model = {
              date: daysOfWeek[startDate.getDay()],
              avgOfPumpRpm: 0,
              avgOfDischargePressure: 0,
              avgOfDischargeFlow: 0,
              avgmotorAmpData: 0,
              avgmotorKwhData: 0,
            };

            var sumOfValuesPump = 0;
            var sumOfValuesDp = 0;
            var sumOfValuesDf = 0;
            var summotorAmpData = 0;
            var summotorKwhData = 0;

            var filteredValuesPump = pumpRpmData.data[0].values.filter((x,i) => {
             const bNo = testBenchNu.data[0]?.values[i]?.value
              return this.checkDateValue(x, startDate,bNo,benchNu);
            })

            var filteredValuesDp = dischargePressureData.data[0].values.filter((x,i) => {
              const bNo = testBenchNu.data[0]?.values[i]?.value
              return this.checkDateValue(x, startDate,bNo,benchNu);
            })

            var filteredValuesDf = dischargeFlowData.data[0].values.filter((x,i) => {
              const bNo = testBenchNu.data[0]?.values[i]?.value
              return this.checkDateValue(x, startDate,bNo,benchNu);
            })

            var filteredValuesMAmp = motorAmpData.data[0].values.filter((x,i) => {
               const bNo = testBenchNu.data[0]?.values[i]?.value
              return this.checkDateValue(x, startDate,bNo,benchNu);
            })

            var filteredValuesKwh = motorKwhData.data[0].values.filter((x,i) => {
               const bNo = testBenchNu.data[0]?.values[i]?.value
              return this.checkDateValue(x, startDate,bNo,benchNu);
            })

            if (filteredValuesPump.length > 0) {
              filteredValuesPump.map(x => {
                sumOfValuesPump += x.value
              })
              var avg = sumOfValuesPump / filteredValuesPump.length;
              model.avgOfPumpRpm = avg;
            }

            if (filteredValuesDp.length > 0) {
              filteredValuesDp.map(x => {
                sumOfValuesDp += x.value
              })
              var avg2 = sumOfValuesDp / filteredValuesDp.length;
              model.avgOfDischargePressure = avg2;
            }

            if (filteredValuesDf.length > 0) {
              filteredValuesDf.map(x => {
                sumOfValuesDf += x.value
              })
              var avg2 = sumOfValuesDf / filteredValuesDf.length;
              model.avgOfDischargeFlow = avg2;
            }

            if (filteredValuesMAmp.length > 0) {
              filteredValuesMAmp.map(x => {
                summotorAmpData += x.value
              })
              var avg2 = summotorAmpData / filteredValuesMAmp.length;
              model.avgmotorAmpData = avg2;
            }

            if (filteredValuesKwh.length > 0) {
              filteredValuesKwh.map(x => {
                summotorKwhData += x.value
              })
              var avg2 = summotorKwhData / filteredValuesKwh.length;
              model.avgmotorKwhData = avg2;
            }


            listofmodel.push(model)

            startDate.setDate(startDate.getDate() + 1);
            nextDate.setDate(nextDate.getDate() + 1)
          }
        }
        else if (filterType == 'Today') {
          var startDate = from1;
          var nextTime = new Date(from1);
          nextTime.setHours(startDate.getHours() + 2);

          while (startDate.getHours() <= to1.getHours()) { 
            var model = {
              date: this.getDoubleDigDateValue(startDate.getHours()) + ":00",
              avgOfPumpRpm: 0,
              avgOfDischargePressure: 0,
              avgOfDischargeFlow: 0,
              avgmotorAmpData: 0,
              avgmotorKwhData: 0,
            };

            var sumOfValuesPump = 0;
            var sumOfValuesDp = 0;
            var sumOfValuesDf = 0;
            var summotorAmpData = 0;
            var summotorKwhData = 0;

            var filteredValuesPump = pumpRpmData.data[0].values.filter((x,i) => {
              const valueDate = new Date(x.timestamp);
              const bNo = testBenchNu.data[0]?.values[i]?.value
           
              if ((valueDate.getHours() <= startDate.getHours()) && (bNo == benchNu)) {
                return true
              }
              else {
                return false;
              }
            })

            var filteredValuesDp = dischargePressureData.data[0].values.filter((x,i) => {
               const valueDate = new Date(x.timestamp);
              const bNo = testBenchNu.data[0]?.values[i]?.value
              if ((valueDate.getHours() <= startDate.getHours())&& (bNo == benchNu)) {
                return true
              }
              else {
                return false;
              }
            })

            var filteredValuesDf = dischargeFlowData.data[0].values.filter((x,i) => {
               const valueDate = new Date(x.timestamp);
              const bNo = testBenchNu.data[0]?.values[i]?.value
              if ((valueDate.getHours() <= startDate.getHours())&& (bNo == benchNu)) {
                return true
              }
              else {
                return false;
              }
            })

            var filteredValuesMAmp = motorAmpData.data[0].values.filter((x,i) => {
               const valueDate = new Date(x.timestamp);
              const bNo = testBenchNu.data[0]?.values[i]?.value
              if ((valueDate.getHours() <= startDate.getHours())&& (bNo == benchNu)) {
                return true
              }
              else {
                return false;
              }
            })

            var filteredValuesKwh = motorKwhData.data[0].values.filter((x,i) => {
               const valueDate = new Date(x.timestamp);
              const bNo = testBenchNu.data[0]?.values[i]?.value
              if ((valueDate.getHours() <= startDate.getHours())&& (bNo == benchNu)) {
                return true
              }
              else {
                return false;
              }
            })

            if (filteredValuesPump.length > 0) {
              filteredValuesPump.map(x => {
                sumOfValuesPump += x.value
              })
              var avg = sumOfValuesPump / filteredValuesPump.length;
              model.avgOfPumpRpm = avg;
            }

            if (filteredValuesDp.length > 0) {
              filteredValuesDp.map(x => {
                sumOfValuesDp += x.value
              })
              var avg2 = sumOfValuesDp / filteredValuesDp.length;
              model.avgOfDischargePressure = avg2;
            }

            if (filteredValuesDf.length > 0) {
              filteredValuesDf.map(x => {
                sumOfValuesDf += x.value
              })
              var avg2 = sumOfValuesDf / filteredValuesDf.length;
              model.avgOfDischargeFlow = avg2;
            }

            if (filteredValuesMAmp.length > 0) {
              filteredValuesMAmp.map(x => {
                summotorAmpData += x.value
              })
              var avg2 = summotorAmpData / filteredValuesMAmp.length;
              model.avgmotorAmpData = avg2;
            }

            if (filteredValuesKwh.length > 0) {
              filteredValuesKwh.map(x => {
                summotorKwhData += x.value
              })
              var avg2 = summotorKwhData / filteredValuesKwh.length;
              model.avgmotorKwhData = avg2;
            }


            listofmodel.push(model);

            startDate.setHours(startDate.getHours() + 2);
            nextTime.setDate(nextTime.getHours() + 2)
          }
        }
        else if (filterType == 'Monthly') {
          var startDate = from1;
          var nextDate = new Date(from1);
          nextDate.setDate(nextDate.getDate() + 1);
          var endDate = to1;
          while (startDate.getTime() <= endDate.getTime()) {
            var model = {
              date: startDate.getDate() + '/' + (startDate.getMonth() + 1),
              avgOfPumpRpm: 0,
              avgOfDischargePressure: 0,
              avgOfDischargeFlow: 0,
              avgmotorAmpData: 0,
              avgmotorKwhData: 0,
            };

            var sumOfValuesPump = 0;
            var sumOfValuesDp = 0;
            var sumOfValuesDf = 0;
            var summotorAmpData = 0;
            var summotorKwhData = 0;

            var filteredValuesPump = pumpRpmData.data[0].values.filter((x,i) => {
               const bNo = testBenchNu.data[0]?.values[i]?.value
              return this.checkDateValue(x, startDate,bNo,benchNu);
            })

            var filteredValuesDp = dischargePressureData.data[0].values.filter((x,i) => {
               const bNo = testBenchNu.data[0]?.values[i]?.value
              return this.checkDateValue(x, startDate,bNo,benchNu);
            })

            var filteredValuesDf = dischargeFlowData.data[0].values.filter((x,i) => {
               const bNo = testBenchNu.data[0]?.values[i]?.value
              return this.checkDateValue(x, startDate,bNo,benchNu);
            })

            var filteredValuesMAmp = motorAmpData.data[0].values.filter((x,i) => {
               const bNo = testBenchNu.data[0]?.values[i]?.value
              return this.checkDateValue(x, startDate,bNo,benchNu);

            })

            var filteredValuesKwh = motorKwhData.data[0].values.filter((x,i) => {
               const bNo = testBenchNu.data[0]?.values[i]?.value
              return this.checkDateValue(x, startDate,bNo,benchNu);
            })



            if (filteredValuesPump.length > 0) {
              filteredValuesPump.map(x => {
                sumOfValuesPump += x.value
              })
              var avg = sumOfValuesPump / filteredValuesPump.length;
              model.avgOfPumpRpm = avg;
            }

            if (filteredValuesDp.length > 0) {
              filteredValuesDp.map(x => {
                sumOfValuesDp += x.value
              })
              var avg2 = sumOfValuesDp / filteredValuesDp.length;
              model.avgOfDischargePressure = avg2;
            }

            if (filteredValuesDf.length > 0) {
              filteredValuesDf.map(x => {
                sumOfValuesDf += x.value
              })
              var avg2 = sumOfValuesDf / filteredValuesDf.length;
              model.avgOfDischargeFlow = avg2;
            }

            if (filteredValuesMAmp.length > 0) {
              filteredValuesMAmp.map(x => {
                summotorAmpData += x.value
              })
              var avg2 = summotorAmpData / filteredValuesMAmp.length;
              model.avgmotorAmpData = avg2;
            }

            if (filteredValuesKwh.length > 0) {
              filteredValuesKwh.map(x => {
                summotorKwhData += x.value
              })
              var avg2 = summotorKwhData / filteredValuesKwh.length;
              model.avgmotorKwhData = avg2;
            }

            listofmodel.push(model)

            startDate.setDate(startDate.getDate() + 1);
            nextDate.setDate(nextDate.getDate() + 1)
          }
        }
        else if (filterType == 'Yearly') {
          const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
          ];

          var startDate = from1;
          var nextDate = new Date(from1);
          nextDate.setMonth(startDate.getMonth() + 1);

          var endDate = to1;

          while (startDate.getTime() <= endDate.getTime()) {

            var model = {
              date: monthNames[startDate.getMonth()],
              avgOfPumpRpm: 0,
              avgOfDischargePressure: 0,
              avgOfDischargeFlow: 0,
              avgmotorAmpData: 0,
              avgmotorKwhData: 0,
            };

            var sumOfValuesPump = 0;
            var sumOfValuesDp = 0;
            var sumOfValuesDf = 0;
            var summotorAmpData = 0;
            var summotorKwhData = 0;


            var filteredValuesPump = pumpRpmData.data[0].values.filter((x,i) => {
               const valueDate = new Date(x.timestamp);
              const bNo = testBenchNu.data[0]?.values[i]?.value
              if ((valueDate.getMonth() == startDate.getMonth()) && (benchNu == bNo)) {
                return true;
              }
              else {
                return false;
              }
            })

            var filteredValuesDp = dischargePressureData.data[0].values.filter((x,i) => {
               const valueDate = new Date(x.timestamp);
              const bNo = testBenchNu.data[0]?.values[i]?.value
              if ((valueDate.getMonth() == startDate.getMonth()) && (benchNu == bNo)) {
                return true;
              }
              else {
                return false;
              }
            })

            var filteredValuesDf = dischargeFlowData.data[0].values.filter((x,i) => {
               const valueDate = new Date(x.timestamp);
              const bNo = testBenchNu.data[0]?.values[i]?.value
              if ((valueDate.getMonth() == startDate.getMonth()) && (benchNu == bNo)) {
                return true;
              }
              else {
                return false;
              }
            })

            var filteredValuesMAmp = motorAmpData.data[0].values.filter((x,i) => {
                  const valueDate = new Date(x.timestamp);
              const bNo = testBenchNu.data[0]?.values[i]?.value
              if ((valueDate.getMonth() == startDate.getMonth()) && (benchNu == bNo)) {
                return true;
              }
              else {
                return false;
              }
            })

            var filteredValuesKwh = motorKwhData.data[0].values.filter((x,i) => {
                  const valueDate = new Date(x.timestamp);
              const bNo = testBenchNu.data[0]?.values[i]?.value
              if ((valueDate.getMonth() == startDate.getMonth()) && (benchNu == bNo)) {
                return true;
              }
              else {
                return false;
              }
            })

            if (filteredValuesPump.length > 0) {
              filteredValuesPump.map(x => {
                sumOfValuesPump += x.value
              })
              var avg = sumOfValuesPump / filteredValuesPump.length;
              model.avgOfPumpRpm = avg;
            }

            if (filteredValuesDp.length > 0) {
              filteredValuesDp.map(x => {
                sumOfValuesDp += x.value
              })
              var avg2 = sumOfValuesDp / filteredValuesDp.length;
              model.avgOfDischargePressure = avg2;
            }

            if (filteredValuesDf.length > 0) {
              filteredValuesDf.map(x => {
                sumOfValuesDf += x.value
              })
              var avg2 = sumOfValuesDf / filteredValuesDf.length;
              model.avgOfDischargeFlow = avg2;
            }

            if (filteredValuesMAmp.length > 0) {
              filteredValuesMAmp.map(x => {
                summotorAmpData += x.value
              })
              var avg2 = summotorAmpData / filteredValuesMAmp.length;
              model.avgmotorAmpData = avg2;
            }

            if (filteredValuesKwh.length > 0) {
              filteredValuesKwh.map(x => {
                summotorKwhData += x.value
              })
              var avg2 = summotorKwhData / filteredValuesKwh.length;
              model.avgmotorKwhData = avg2;
            }

            listofmodel.push(model)

            startDate.setMonth(startDate.getMonth() + 1);
            nextDate.setMonth(nextDate.getMonth() + 1)
          }
        }
        return listofmodel
      }))
    }
    else
    {
      return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, modelList).pipe(map((data: BulkData[]) => {
          var pumpRpmData = data[0];
          var dischargePressureData = data[1];
          var dischargeFlowData = data[2];
          var motorAmpData = data[3];
          var motorKwhData = data[4];
          var testBenchNu = data[5]
          var listofmodel = []
  
          if (filterType == 'Weekly') {
            const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            var startDate = from1;
            var nextDate = new Date(from1);
            nextDate.setDate(nextDate.getDate() + 1);
            var endDate = to1;
            while (startDate.getTime() <= endDate.getTime()) {
  
              var model = {
                date: daysOfWeek[startDate.getDay()],
                avgOfPumpRpm: 0,
                avgOfDischargePressure: 0,
                avgOfDischargeFlow: 0,
                avgmotorAmpData: 0,
                avgmotorKwhData: 0,
              };
  
              var sumOfValuesPump = 0;
              var sumOfValuesDp = 0;
              var sumOfValuesDf = 0;
              var summotorAmpData = 0;
              var summotorKwhData = 0;
  
              var filteredValuesPump = pumpRpmData.data[0].values.filter((x,i) => {
               const bNo = testBenchNu.data[0]?.values[i]?.value
                return this.checkDateValue(x, startDate,bNo,benchNu);
              })
  
              var filteredValuesDp = dischargePressureData.data[0].values.filter((x,i) => {
                const bNo = testBenchNu.data[0]?.values[i]?.value
                return this.checkDateValue(x, startDate,bNo,benchNu);
              })
  
              var filteredValuesDf = dischargeFlowData.data[0].values.filter((x,i) => {
                const bNo = testBenchNu.data[0]?.values[i]?.value
                return this.checkDateValue(x, startDate,bNo,benchNu);
              })
  
              var filteredValuesMAmp = motorAmpData.data[0].values.filter((x,i) => {
                 const bNo = testBenchNu.data[0]?.values[i]?.value
                return this.checkDateValue(x, startDate,bNo,benchNu);
              })
  
              var filteredValuesKwh = motorKwhData.data[0].values.filter((x,i) => {
                 const bNo = testBenchNu.data[0]?.values[i]?.value
                return this.checkDateValue(x, startDate,bNo,benchNu);
              })
  
              if (filteredValuesPump.length > 0) {
                filteredValuesPump.map(x => {
                  sumOfValuesPump += x.value
                })
                var avg = sumOfValuesPump / filteredValuesPump.length;
                model.avgOfPumpRpm = avg;
              }
  
              if (filteredValuesDp.length > 0) {
                filteredValuesDp.map(x => {
                  sumOfValuesDp += x.value
                })
                var avg2 = sumOfValuesDp / filteredValuesDp.length;
                model.avgOfDischargePressure = avg2;
              }
  
              if (filteredValuesDf.length > 0) {
                filteredValuesDf.map(x => {
                  sumOfValuesDf += x.value
                })
                var avg2 = sumOfValuesDf / filteredValuesDf.length;
                model.avgOfDischargeFlow = avg2;
              }
  
              if (filteredValuesMAmp.length > 0) {
                filteredValuesMAmp.map(x => {
                  summotorAmpData += x.value
                })
                var avg2 = summotorAmpData / filteredValuesMAmp.length;
                model.avgmotorAmpData = avg2;
              }
  
              if (filteredValuesKwh.length > 0) {
                filteredValuesKwh.map(x => {
                  summotorKwhData += x.value
                })
                var avg2 = summotorKwhData / filteredValuesKwh.length;
                model.avgmotorKwhData = avg2;
              }
  
  
              listofmodel.push(model)
  
              startDate.setDate(startDate.getDate() + 1);
              nextDate.setDate(nextDate.getDate() + 1)
            }
          }
          else if (filterType == 'Today') {
            var startDate = from1;
            var nextTime = new Date(from1);
            nextTime.setHours(startDate.getHours() + 2);
  
            while (startDate.getHours() <= to1.getHours()) { 
              var model = {
                date: this.getDoubleDigDateValue(startDate.getHours()) + ":00",
                avgOfPumpRpm: 0,
                avgOfDischargePressure: 0,
                avgOfDischargeFlow: 0,
                avgmotorAmpData: 0,
                avgmotorKwhData: 0,
              };
  
              var sumOfValuesPump = 0;
              var sumOfValuesDp = 0;
              var sumOfValuesDf = 0;
              var summotorAmpData = 0;
              var summotorKwhData = 0;
  
              var filteredValuesPump = pumpRpmData.data[0].values.filter((x,i) => {
                const valueDate = new Date(x.timestamp);
                const bNo = testBenchNu.data[0]?.values[i]?.value
             
                if ((valueDate.getHours() <= startDate.getHours()) && (bNo == benchNu)) {
                  return true
                }
                else {
                  return false;
                }
              })
  
              var filteredValuesDp = dischargePressureData.data[0].values.filter((x,i) => {
                 const valueDate = new Date(x.timestamp);
                const bNo = testBenchNu.data[0]?.values[i]?.value
                if ((valueDate.getHours() <= startDate.getHours())&& (bNo == benchNu)) {
                  return true
                }
                else {
                  return false;
                }
              })
  
              var filteredValuesDf = dischargeFlowData.data[0].values.filter((x,i) => {
                 const valueDate = new Date(x.timestamp);
                const bNo = testBenchNu.data[0]?.values[i]?.value
                if ((valueDate.getHours() <= startDate.getHours())&& (bNo == benchNu)) {
                  return true
                }
                else {
                  return false;
                }
              })
  
              var filteredValuesMAmp = motorAmpData.data[0].values.filter((x,i) => {
                 const valueDate = new Date(x.timestamp);
                const bNo = testBenchNu.data[0]?.values[i]?.value
                if ((valueDate.getHours() <= startDate.getHours())&& (bNo == benchNu)) {
                  return true
                }
                else {
                  return false;
                }
              })
  
              var filteredValuesKwh = motorKwhData.data[0].values.filter((x,i) => {
                 const valueDate = new Date(x.timestamp);
                const bNo = testBenchNu.data[0]?.values[i]?.value
                if ((valueDate.getHours() <= startDate.getHours())&& (bNo == benchNu)) {
                  return true
                }
                else {
                  return false;
                }
              })
  
              if (filteredValuesPump.length > 0) {
                filteredValuesPump.map(x => {
                  sumOfValuesPump += x.value
                })
                var avg = sumOfValuesPump / filteredValuesPump.length;
                model.avgOfPumpRpm = avg;
              }
  
              if (filteredValuesDp.length > 0) {
                filteredValuesDp.map(x => {
                  sumOfValuesDp += x.value
                })
                var avg2 = sumOfValuesDp / filteredValuesDp.length;
                model.avgOfDischargePressure = avg2;
              }
  
              if (filteredValuesDf.length > 0) {
                filteredValuesDf.map(x => {
                  sumOfValuesDf += x.value
                })
                var avg2 = sumOfValuesDf / filteredValuesDf.length;
                model.avgOfDischargeFlow = avg2;
              }
  
              if (filteredValuesMAmp.length > 0) {
                filteredValuesMAmp.map(x => {
                  summotorAmpData += x.value
                })
                var avg2 = summotorAmpData / filteredValuesMAmp.length;
                model.avgmotorAmpData = avg2;
              }
  
              if (filteredValuesKwh.length > 0) {
                filteredValuesKwh.map(x => {
                  summotorKwhData += x.value
                })
                var avg2 = summotorKwhData / filteredValuesKwh.length;
                model.avgmotorKwhData = avg2;
              }
  
              listofmodel.push(model);
  
              startDate.setHours(startDate.getHours() + 2);
              nextTime.setDate(nextTime.getHours() + 2)
            }
          }
          else if (filterType == 'Monthly') {
            var startDate = from1;
            var nextDate = new Date(from1);
            nextDate.setDate(nextDate.getDate() + 1);
            var endDate = to1;
            while (startDate.getTime() <= endDate.getTime()) {
              var model = {
                date: startDate.getDate() + '/' + (startDate.getMonth() + 1),
                avgOfPumpRpm: 0,
                avgOfDischargePressure: 0,
                avgOfDischargeFlow: 0,
                avgmotorAmpData: 0,
                avgmotorKwhData: 0,
              };
  
              var sumOfValuesPump = 0;
              var sumOfValuesDp = 0;
              var sumOfValuesDf = 0;
              var summotorAmpData = 0;
              var summotorKwhData = 0;
  
              var filteredValuesPump = pumpRpmData.data[0].values.filter((x,i) => {
                 const bNo = testBenchNu.data[0]?.values[i]?.value
                return this.checkDateValue(x, startDate,bNo,benchNu);
              })
  
              var filteredValuesDp = dischargePressureData.data[0].values.filter((x,i) => {
                 const bNo = testBenchNu.data[0]?.values[i]?.value
                return this.checkDateValue(x, startDate,bNo,benchNu);
              })
  
              var filteredValuesDf = dischargeFlowData.data[0].values.filter((x,i) => {
                 const bNo = testBenchNu.data[0]?.values[i]?.value
                return this.checkDateValue(x, startDate,bNo,benchNu);
              })
  
              var filteredValuesMAmp = motorAmpData.data[0].values.filter((x,i) => {
                 const bNo = testBenchNu.data[0]?.values[i]?.value
                return this.checkDateValue(x, startDate,bNo,benchNu);
  
              })
  
              var filteredValuesKwh = motorKwhData.data[0].values.filter((x,i) => {
                 const bNo = testBenchNu.data[0]?.values[i]?.value
                return this.checkDateValue(x, startDate,bNo,benchNu);
              })
  
  
              if (filteredValuesPump.length > 0) {
                filteredValuesPump.map(x => {
                  sumOfValuesPump += x.value
                })
                var avg = sumOfValuesPump / filteredValuesPump.length;
                model.avgOfPumpRpm = avg;
              }
  
              if (filteredValuesDp.length > 0) {
                filteredValuesDp.map(x => {
                  sumOfValuesDp += x.value
                })
                var avg2 = sumOfValuesDp / filteredValuesDp.length;
                model.avgOfDischargePressure = avg2;
              }
  
              if (filteredValuesDf.length > 0) {
                filteredValuesDf.map(x => {
                  sumOfValuesDf += x.value
                })
                var avg2 = sumOfValuesDf / filteredValuesDf.length;
                model.avgOfDischargeFlow = avg2;
              }
  
              if (filteredValuesMAmp.length > 0) {
                filteredValuesMAmp.map(x => {
                  summotorAmpData += x.value
                })
                var avg2 = summotorAmpData / filteredValuesMAmp.length;
                model.avgmotorAmpData = avg2;
              }
  
              if (filteredValuesKwh.length > 0) {
                filteredValuesKwh.map(x => {
                  summotorKwhData += x.value
                })
                var avg2 = summotorKwhData / filteredValuesKwh.length;
                model.avgmotorKwhData = avg2;
              }
  
              listofmodel.push(model)
  
              startDate.setDate(startDate.getDate() + 1);
              nextDate.setDate(nextDate.getDate() + 1)
            }
          }
          else if (filterType == 'Yearly') {
            const monthNames = [
              "January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"
            ];
  
            var startDate = from1;
            var nextDate = new Date(from1);
            nextDate.setMonth(startDate.getMonth() + 1);
  
            var endDate = to1;
  
            while (startDate.getTime() <= endDate.getTime()) {
  
              var model = {
                date: monthNames[startDate.getMonth()],
                avgOfPumpRpm: 0,
                avgOfDischargePressure: 0,
                avgOfDischargeFlow: 0,
                avgmotorAmpData: 0,
                avgmotorKwhData: 0,
              };
  
              var sumOfValuesPump = 0;
              var sumOfValuesDp = 0;
              var sumOfValuesDf = 0;
              var summotorAmpData = 0;
              var summotorKwhData = 0;
  
  
              var filteredValuesPump = pumpRpmData.data[0].values.filter((x,i) => {
                 const valueDate = new Date(x.timestamp);
                const bNo = testBenchNu.data[0]?.values[i]?.value
                if ((valueDate.getMonth() == startDate.getMonth()) && (benchNu == bNo)) {
                  return true;
                }
                else {
                  return false;
                }
              })
  
              var filteredValuesDp = dischargePressureData.data[0].values.filter((x,i) => {
                 const valueDate = new Date(x.timestamp);
                const bNo = testBenchNu.data[0]?.values[i]?.value
                if ((valueDate.getMonth() == startDate.getMonth()) && (benchNu == bNo)) {
                  return true;
                }
                else {
                  return false;
                }
              })
  
              var filteredValuesDf = dischargeFlowData.data[0].values.filter((x,i) => {
                 const valueDate = new Date(x.timestamp);
                const bNo = testBenchNu.data[0]?.values[i]?.value
                if ((valueDate.getMonth() == startDate.getMonth()) && (benchNu == bNo)) {
                  return true;
                }
                else {
                  return false;
                }
              })
  
              var filteredValuesMAmp = motorAmpData.data[0].values.filter((x,i) => {
                    const valueDate = new Date(x.timestamp);
                const bNo = testBenchNu.data[0]?.values[i]?.value
                if ((valueDate.getMonth() == startDate.getMonth()) && (benchNu == bNo)) {
                  return true;
                }
                else {
                  return false;
                }
              })
  
              var filteredValuesKwh = motorKwhData.data[0].values.filter((x,i) => {
                    const valueDate = new Date(x.timestamp);
                const bNo = testBenchNu.data[0]?.values[i]?.value
                if ((valueDate.getMonth() == startDate.getMonth()) && (benchNu == bNo)) {
                  return true;
                }
                else {
                  return false;
                }
              })
  
  
              if (filteredValuesPump.length > 0) {
                filteredValuesPump.map(x => {
                  sumOfValuesPump += x.value
                })
                var avg = sumOfValuesPump / filteredValuesPump.length;
                model.avgOfPumpRpm = avg;
              }
  
              if (filteredValuesDp.length > 0) {
                filteredValuesDp.map(x => {
                  sumOfValuesDp += x.value
                })
                var avg2 = sumOfValuesDp / filteredValuesDp.length;
                model.avgOfDischargePressure = avg2;
              }
  
              if (filteredValuesDf.length > 0) {
                filteredValuesDf.map(x => {
                  sumOfValuesDf += x.value
                })
                var avg2 = sumOfValuesDf / filteredValuesDf.length;
                model.avgOfDischargeFlow = avg2;
              }
  
              if (filteredValuesMAmp.length > 0) {
                filteredValuesMAmp.map(x => {
                  summotorAmpData += x.value
                })
                var avg2 = summotorAmpData / filteredValuesMAmp.length;
                model.avgmotorAmpData = avg2;
              }
  
              if (filteredValuesKwh.length > 0) {
                filteredValuesKwh.map(x => {
                  summotorKwhData += x.value
                })
                var avg2 = summotorKwhData / filteredValuesKwh.length;
                model.avgmotorKwhData = avg2;
              }
  
              listofmodel.push(model)
  
              startDate.setMonth(startDate.getMonth() + 1);
              nextDate.setMonth(nextDate.getMonth() + 1)
            }
          }
          return listofmodel
      }));
    }
    
  }

  getTestBenchChart(variableList: string[], from1: Date, to1: Date, filterType, benchNu) {
    // Variable list ['Pump RPM','Discharge Pressure','DischargeFlow']
    var modelList = [];
    var from = this.getValidDateString(from1);
    var to = this.getValidDateString(to1);
    
    var url = `DataService/Data/Bulk/Read`

    for (let i = 0; i < variableList.length; i++) {
      var model1 = {
        "variableId": variableList[i],
        "order": 'Descending',
        "limit":20,
        "from": from,
        "to": to
      }
      modelList.push(model1);
    }
   
    var model ={
      "url":url,
      "json":modelList
    }
    if(environment.production)
    {
      return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model).pipe(map((data: any) => {
        var pumpRpmData = data[0];
        var dischargePressureData = data[1];
        var dischargeFlowData = data[2];
        var motorAmpData = data[3];
        var motorKwhData = data[4];
       // var testBenchNu = data[5]
      
        var listofmodel = []
  
          var startDate = from1;
          
            var filteredValuesPump = pumpRpmData.data[0].values
  
            var filteredValuesDp = dischargePressureData.data[0].values
  
            var filteredValuesDf = dischargeFlowData.data[0].values
  
            var filteredValuesMAmp = motorAmpData.data[0].values
  
            var filteredValuesKwh = motorKwhData.data[0].values
  
  
            for(let i =0 ; i< filteredValuesPump.length;i++)
            {
              var model2 = {
                date: '',
                avgOfPumpRpm: 0,
                avgOfDischargePressure: 0,
                avgOfDischargeFlow: 0,
                avgmotorAmpData: 0,
                avgmotorKwhData: 0,
              };
  
              var date123 = new Date(filteredValuesPump[i].timestamp)
              model2.date =  date123.getHours() +":"+date123.getMinutes()+":"+date123.getSeconds()
  
              model2.avgOfPumpRpm = filteredValuesPump[i].value
  
              model2.avgOfDischargePressure = filteredValuesDp[i].value
             
              model2.avgOfDischargeFlow = filteredValuesDf[i].value
  
              model2.avgmotorAmpData  = filteredValuesMAmp[i].value
              
              model2.avgmotorKwhData = filteredValuesKwh[i].value;
  
              listofmodel.push(model2);
  
            }
            listofmodel.reverse()
             return listofmodel
      }))
    }
    else
    {
      return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, modelList).pipe(map((data: BulkData[]) => {
  
        var pumpRpmData = data[0];
        var dischargePressureData = data[1];
        var dischargeFlowData = data[2];
        var motorAmpData = data[3];
        var motorKwhData = data[4];
        var testBenchNu = data[5]
        var listofmodel = []
  
          var startDate = from1;
           
            var filteredValuesPump = pumpRpmData.data[0].values
  
            var filteredValuesDp = dischargePressureData.data[0].values
  
            var filteredValuesDf = dischargeFlowData.data[0].values
  
            var filteredValuesMAmp = motorAmpData.data[0].values
  
            var filteredValuesKwh = motorKwhData.data[0].values
  
            for(let i =0 ; i< filteredValuesPump.length;i++)
            {
              var model2 = {
                date: '',
                avgOfPumpRpm: 0,
                avgOfDischargePressure: 0,
                avgOfDischargeFlow: 0,
                avgmotorAmpData: 0,
                avgmotorKwhData: 0,
              };
  
              var date123 = new Date(filteredValuesPump[i].timestamp)
              model2.date =  date123.getHours() +":"+date123.getMinutes()+":"+date123.getSeconds()
  
              model2.avgOfPumpRpm = filteredValuesPump[i].value
  
              model2.avgOfDischargePressure = filteredValuesDp[i].value
             
              model2.avgOfDischargeFlow = filteredValuesDf[i].value
  
              model2.avgmotorAmpData  = filteredValuesMAmp[i].value
              
              model2.avgmotorKwhData = filteredValuesKwh[i].value;
  
              listofmodel.push(model2);
  
            }

            listofmodel.reverse()
        return listofmodel
      }));
    }
  }

  // getTestBenchChart(variableList: string[], from1: Date, to1: Date, filterType) {
  //   // Variable list ['Pump RPM','Discharge Pressure','DischargeFlow']
  //   var modelList = [];
  //   var from = this.getValidDateString(from1);
  //   var to = this.getValidDateString(to1);
  //   for (let i = 0; i < variableList.length; i++) {
  //     var model = {
  //       "variableId": variableList[i],
  //       "order": 'Descending',
  //       "from": from,
  //       "to": to
  //     }
  //     modelList.push(model);
  //   }
  //   if (environment.production) {

  //     var url = `DataService/Data/Bulk/Read`

  //     var model1 = {
  //       url: url,
  //       json: JSON.stringify(modelList)
  //     }

  //     return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model1).pipe(map((data: any) => {
  //       var pumpRpmData = data[0];
  //       var dischargePressureData = data[1];
  //       var dischargeFlowData = data[2];

  //       var listofmodel = []

  //       if (filterType == 'Weekly') {
  //         const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  //         var startDate = from1;
  //         var nextDate = new Date(from1);
  //         nextDate.setDate(nextDate.getDate() + 1);
  //         var endDate = to1;
  //         while (startDate.getTime() <= endDate.getTime()) {

  //           var model = {
  //             date: daysOfWeek[startDate.getDay()],
  //             avgOfPumpRpm: 0,
  //             avgOfDischargePressure: 0,
  //             avgOfDischargeFlow: 0
  //           };

  //           var sumOfValuesPump = 0;
  //           var sumOfValuesDp = 0;
  //           var sumOfValuesDf = 0;

  //           var filteredValuesPump = pumpRpmData.data[0].values.filter((x) => {
  //             return this.checkDateValue(x, startDate);
  //           })

  //           var filteredValuesDp = dischargePressureData.data[0].values.filter((x) => {
  //             return this.checkDateValue(x, startDate);
  //           })

  //           var filteredValuesDf = dischargeFlowData.data[0].values.filter((x) => {
  //             return this.checkDateValue(x, startDate);
  //           })

  //           if (filteredValuesPump.length > 0) {
  //             filteredValuesPump.map(x => {
  //               sumOfValuesPump += x.value
  //             })
  //             var avg = sumOfValuesPump / filteredValuesPump.length;
  //             model.avgOfPumpRpm = avg;
  //           }

  //           if (filteredValuesDp.length > 0) {
  //             filteredValuesDp.map(x => {
  //               sumOfValuesDp += x.value
  //             })
  //             var avg2 = sumOfValuesDp / filteredValuesDp.length;
  //             model.avgOfDischargePressure = avg2;
  //           }

  //           if (filteredValuesDf.length > 0) {
  //             filteredValuesDf.map(x => {
  //               sumOfValuesDf += x.value
  //             })
  //             var avg2 = sumOfValuesDf / filteredValuesDf.length;
  //             model.avgOfDischargeFlow = avg2;
  //           }


  //           listofmodel.push(model)

  //           startDate.setDate(startDate.getDate() + 1);
  //           nextDate.setDate(nextDate.getDate() + 1)
  //         }
  //       }
  //       else if (filterType == 'Today') {
  //         var startDate = from1;
  //         var nextTime = new Date(from1);
  //         nextTime.setHours(startDate.getHours() + 2);

  //         while (startDate.getHours() <= to1.getHours()) {
  //           var model = {
  //             date: this.getDoubleDigDateValue(startDate.getHours()) + ":00",
  //             avgOfPumpRpm: 0,
  //             avgOfDischargePressure: 0,
  //             avgOfDischargeFlow: 0

  //           };

  //           var sumOfValuesPump = 0;
  //           var sumOfValuesDp = 0;
  //           var sumOfValuesDf = 0;

  //           var filteredValuesPump = pumpRpmData.data[0].values.filter((x) => {
  //             const valueDate = new Date(x.timestamp);
  //             if (valueDate.getHours() <= startDate.getHours()) {
  //               return true
  //             }
  //             else {
  //               return false;
  //             }
  //           })

  //           var filteredValuesDp = dischargePressureData.data[0].values.filter((x) => {
  //             const valueDate = new Date(x.timestamp);
  //             if (valueDate.getHours() <= startDate.getHours()) {
  //               return true
  //             }
  //             else {
  //               return false;
  //             }
  //           })

  //           var filteredValuesDf = dischargeFlowData.data[0].values.filter((x) => {
  //             const valueDate = new Date(x.timestamp);
  //             if (valueDate.getHours() <= startDate.getHours()) {
  //               return true
  //             }
  //             else {
  //               return false;
  //             }
  //           })



  //           if (filteredValuesPump.length > 0) {
  //             filteredValuesPump.map(x => {
  //               sumOfValuesPump += x.value
  //             })
  //             var avg = sumOfValuesPump / filteredValuesPump.length;
  //             model.avgOfPumpRpm = avg;
  //           }

  //           if (filteredValuesDp.length > 0) {
  //             filteredValuesDp.map(x => {
  //               sumOfValuesDp += x.value
  //             })
  //             var avg2 = sumOfValuesDp / filteredValuesDp.length;
  //             model.avgOfDischargePressure = avg2;
  //           }

  //           if (filteredValuesDf.length > 0) {
  //             filteredValuesDf.map(x => {
  //               sumOfValuesDf += x.value
  //             })
  //             var avg2 = sumOfValuesDf / filteredValuesDf.length;
  //             model.avgOfDischargeFlow = avg2;
  //           }



  //           listofmodel.push(model)

  //           startDate.setHours(startDate.getHours() + 2);
  //           nextTime.setDate(nextTime.getHours() + 2)
  //         }
  //       }
  //       else if (filterType == 'Monthly') {
  //         var startDate = from1;
  //         var nextDate = new Date(from1);
  //         nextDate.setDate(nextDate.getDate() + 1);
  //         var endDate = to1;
  //         while (startDate.getTime() <= endDate.getTime()) {

  //           var model = {
  //             date: startDate.getDate() + '/' + (startDate.getMonth() + 1),
  //             avgOfPumpRpm: 0,
  //             avgOfDischargePressure: 0,
  //             avgOfDischargeFlow: 0

  //           };

  //           var sumOfValuesPump = 0;
  //           var sumOfValuesDp = 0;
  //           var sumOfValuesDf = 0;

  //           var filteredValuesPump = pumpRpmData.data[0].values.filter((x) => {
  //             return this.checkDateValue(x, startDate);
  //           })

  //           var filteredValuesDp = dischargePressureData.data[0].values.filter((x) => {
  //             return this.checkDateValue(x, startDate);
  //           })

  //           var filteredValuesDf = dischargeFlowData.data[0].values.filter((x) => {
  //             return this.checkDateValue(x, startDate);
  //           })



  //           if (filteredValuesPump.length > 0) {
  //             filteredValuesPump.map(x => {
  //               sumOfValuesPump += x.value
  //             })
  //             var avg = sumOfValuesPump / filteredValuesPump.length;
  //             model.avgOfPumpRpm = avg;
  //           }

  //           if (filteredValuesDp.length > 0) {
  //             filteredValuesDp.map(x => {
  //               sumOfValuesDp += x.value
  //             })
  //             var avg2 = sumOfValuesDp / filteredValuesDp.length;
  //             model.avgOfDischargePressure = avg2;
  //           }

  //           if (filteredValuesDf.length > 0) {
  //             filteredValuesDf.map(x => {
  //               sumOfValuesDf += x.value
  //             })
  //             var avg2 = sumOfValuesDf / filteredValuesDf.length;
  //             model.avgOfDischargeFlow = avg2;
  //           }



  //           listofmodel.push(model)

  //           startDate.setDate(startDate.getDate() + 1);
  //           nextDate.setDate(nextDate.getDate() + 1)
  //         }
  //       }
  //       else if (filterType == 'Yearly') {
  //         const monthNames = [
  //           "January", "February", "March", "April", "May", "June",
  //           "July", "August", "September", "October", "November", "December"
  //         ];

  //         var startDate = from1;
  //         var nextDate = new Date(from1);
  //         nextDate.setMonth(startDate.getMonth() + 1);

  //         var endDate = to1;

  //         while (startDate.getTime() <= endDate.getTime()) {

  //           var model = {
  //             date: monthNames[startDate.getMonth()],
  //             avgOfPumpRpm: 0,
  //             avgOfDischargePressure: 0,
  //             avgOfDischargeFlow: 0
  //           };

  //           var sumOfValuesPump = 0;
  //           var sumOfValuesDp = 0;
  //           var sumOfValuesDf = 0;


  //           var filteredValuesPump = pumpRpmData.data[0].values.filter((x) => {
  //             const valueDate = new Date(x.timestamp);
  //             if (valueDate.getMonth() == startDate.getMonth()) {
  //               return true;
  //             }
  //             else {
  //               return false;
  //             }
  //           })

  //           var filteredValuesDp = dischargePressureData.data[0].values.filter((x) => {
  //             const valueDate = new Date(x.timestamp);
  //             if (valueDate.getMonth() == startDate.getMonth()) {
  //               return true;
  //             }
  //             else {
  //               return false;
  //             }
  //           })

  //           var filteredValuesDf = dischargeFlowData.data[0].values.filter((x) => {
  //             const valueDate = new Date(x.timestamp);
  //             if (valueDate.getMonth() == startDate.getMonth()) {
  //               return true;
  //             }
  //             else {
  //               return false;
  //             }
  //           })



  //           if (filteredValuesPump.length > 0) {
  //             filteredValuesPump.map(x => {
  //               sumOfValuesPump += x.value
  //             })
  //             var avg = sumOfValuesPump / filteredValuesPump.length;
  //             model.avgOfPumpRpm = avg;
  //           }

  //           if (filteredValuesDp.length > 0) {
  //             filteredValuesDp.map(x => {
  //               sumOfValuesDp += x.value
  //             })
  //             var avg2 = sumOfValuesDp / filteredValuesDp.length;
  //             model.avgOfDischargePressure = avg2;
  //           }

  //           if (filteredValuesDf.length > 0) {
  //             filteredValuesDf.map(x => {
  //               sumOfValuesDf += x.value
  //             })
  //             var avg2 = sumOfValuesDf / filteredValuesDf.length;
  //             model.avgOfDischargeFlow = avg2;
  //           }

  //           listofmodel.push(model)

  //           startDate.setMonth(startDate.getMonth() + 1);
  //           nextDate.setMonth(nextDate.getMonth() + 1)
  //         }

  //       }

  //       return listofmodel
  //     }));

  //   }
  //   else {
  //     return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, modelList).pipe(map((data: BulkData[]) => {
  //       var pumpRpmData = data[0];
  //       var dischargePressureData = data[1];
  //       var dischargeFlowData = data[2];
  //       var motorAmpData = data[3];
  //       var motorKwhData = data[4];

  //       var listofmodel = []

  //       if (filterType == 'Weekly') {
  //         const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  //         var startDate = from1;
  //         var nextDate = new Date(from1);
  //         nextDate.setDate(nextDate.getDate() + 1);
  //         var endDate = to1;
  //         while (startDate.getTime() <= endDate.getTime()) {

  //           var model = {
  //             date: daysOfWeek[startDate.getDay()],
  //             avgOfPumpRpm: 0,
  //             avgOfDischargePressure: 0,
  //             avgOfDischargeFlow: 0,
  //             avgmotorAmpData: 0,
  //             avgmotorKwhData: 0,
  //           };

  //           var sumOfValuesPump = 0;
  //           var sumOfValuesDp = 0;
  //           var sumOfValuesDf = 0;
  //           var summotorAmpData = 0;
  //           var summotorKwhData = 0;

  //           var filteredValuesPump = pumpRpmData.data[0].values.filter((x) => {
  //             return this.checkDateValue(x, startDate);
  //           })

  //           var filteredValuesDp = dischargePressureData.data[0].values.filter((x) => {
  //             return this.checkDateValue(x, startDate);
  //           })

  //           var filteredValuesDf = dischargeFlowData.data[0].values.filter((x) => {
  //             return this.checkDateValue(x, startDate);
  //           })

  //           var filteredValuesMAmp = motorAmpData.data[0].values.filter((x) => {
  //             return this.checkDateValue(x, startDate);
  //           })

  //           var filteredValuesKwh = motorKwhData.data[0].values.filter((x) => {
  //             return this.checkDateValue(x, startDate);
  //           })

  //           if (filteredValuesPump.length > 0) {
  //             filteredValuesPump.map(x => {
  //               sumOfValuesPump += x.value
  //             })
  //             var avg = sumOfValuesPump / filteredValuesPump.length;
  //             model.avgOfPumpRpm = avg;
  //           }

  //           if (filteredValuesDp.length > 0) {
  //             filteredValuesDp.map(x => {
  //               sumOfValuesDp += x.value
  //             })
  //             var avg2 = sumOfValuesDp / filteredValuesDp.length;
  //             model.avgOfDischargePressure = avg2;
  //           }

  //           if (filteredValuesDf.length > 0) {
  //             filteredValuesDf.map(x => {
  //               sumOfValuesDf += x.value
  //             })
  //             var avg2 = sumOfValuesDf / filteredValuesDf.length;
  //             model.avgOfDischargeFlow = avg2;
  //           }

  //           if (filteredValuesMAmp.length > 0) {
  //             filteredValuesMAmp.map(x => {
  //               summotorAmpData += x.value
  //             })
  //             var avg2 = summotorAmpData / filteredValuesMAmp.length;
  //             model.avgmotorAmpData = avg2;
  //           }

  //           if (filteredValuesKwh.length > 0) {
  //             filteredValuesKwh.map(x => {
  //               summotorKwhData += x.value
  //             })
  //             var avg2 = summotorKwhData / filteredValuesKwh.length;
  //             model.avgmotorKwhData = avg2;
  //           }


  //           listofmodel.push(model)

  //           startDate.setDate(startDate.getDate() + 1);
  //           nextDate.setDate(nextDate.getDate() + 1)
  //         }
  //       }
  //       else if (filterType == 'Today') {
  //         var startDate = from1;
  //         var nextTime = new Date(from1);
  //         nextTime.setHours(startDate.getHours() + 2);

  //         while (startDate.getHours() <= to1.getHours()) { 
  //           var model = {
  //             date: this.getDoubleDigDateValue(startDate.getHours()) + ":00",
  //             avgOfPumpRpm: 0,
  //             avgOfDischargePressure: 0,
  //             avgOfDischargeFlow: 0,
  //             avgmotorAmpData: 0,
  //             avgmotorKwhData: 0,
  //           };

  //           var sumOfValuesPump = 0;
  //           var sumOfValuesDp = 0;
  //           var sumOfValuesDf = 0;
  //           var summotorAmpData = 0;
  //           var summotorKwhData = 0;

  //           var filteredValuesPump = pumpRpmData.data[0].values.filter((x) => {
  //             const valueDate = new Date(x.timestamp);
  //             if (valueDate.getHours() <= startDate.getHours()) {
  //               return true
  //             }
  //             else {
  //               return false;
  //             }
  //           })

  //           var filteredValuesDp = dischargePressureData.data[0].values.filter((x) => {
  //             const valueDate = new Date(x.timestamp);
  //             if (valueDate.getHours() <= startDate.getHours()) {
  //               return true
  //             }
  //             else {
  //               return false;
  //             }
  //           })

  //           var filteredValuesDf = dischargeFlowData.data[0].values.filter((x) => {
  //             const valueDate = new Date(x.timestamp);
  //             if (valueDate.getHours() <= startDate.getHours()) {
  //               return true
  //             }
  //             else {
  //               return false;
  //             }
  //           })

  //           var filteredValuesMAmp = motorAmpData.data[0].values.filter((x) => {
  //             const valueDate = new Date(x.timestamp);
  //             if (valueDate.getHours() <= startDate.getHours()) {
  //               return true
  //             }
  //             else {
  //               return false;
  //             }
  //           })

  //           var filteredValuesKwh = motorKwhData.data[0].values.filter((x) => {
  //             const valueDate = new Date(x.timestamp);
  //             if (valueDate.getHours() <= startDate.getHours()) {
  //               return true
  //             }
  //             else {
  //               return false;
  //             }
  //           })

  //           if (filteredValuesPump.length > 0) {
  //             filteredValuesPump.map(x => {
  //               sumOfValuesPump += x.value
  //             })
  //             var avg = sumOfValuesPump / filteredValuesPump.length;
  //             model.avgOfPumpRpm = avg;
  //           }

  //           if (filteredValuesDp.length > 0) {
  //             filteredValuesDp.map(x => {
  //               sumOfValuesDp += x.value
  //             })
  //             var avg2 = sumOfValuesDp / filteredValuesDp.length;
  //             model.avgOfDischargePressure = avg2;
  //           }

  //           if (filteredValuesDf.length > 0) {
  //             filteredValuesDf.map(x => {
  //               sumOfValuesDf += x.value
  //             })
  //             var avg2 = sumOfValuesDf / filteredValuesDf.length;
  //             model.avgOfDischargeFlow = avg2;
  //           }

  //           if (filteredValuesMAmp.length > 0) {
  //             filteredValuesMAmp.map(x => {
  //               summotorAmpData += x.value
  //             })
  //             var avg2 = summotorAmpData / filteredValuesMAmp.length;
  //             model.avgmotorAmpData = avg2;
  //           }

  //           if (filteredValuesKwh.length > 0) {
  //             filteredValuesKwh.map(x => {
  //               summotorKwhData += x.value
  //             })
  //             var avg2 = summotorKwhData / filteredValuesKwh.length;
  //             model.avgmotorKwhData = avg2;
  //           }


  //           listofmodel.push(model)

  //           startDate.setHours(startDate.getHours() + 2);
  //           nextTime.setDate(nextTime.getHours() + 2)
  //         }
  //       }
  //       else if (filterType == 'Monthly') {
  //         var startDate = from1;
  //         var nextDate = new Date(from1);
  //         nextDate.setDate(nextDate.getDate() + 1);
  //         var endDate = to1;
  //         while (startDate.getTime() <= endDate.getTime()) {
  //           var model = {
  //             date: startDate.getDate() + '/' + (startDate.getMonth() + 1),
  //             avgOfPumpRpm: 0,
  //             avgOfDischargePressure: 0,
  //             avgOfDischargeFlow: 0,
  //             avgmotorAmpData: 0,
  //             avgmotorKwhData: 0,
  //           };

  //           var sumOfValuesPump = 0;
  //           var sumOfValuesDp = 0;
  //           var sumOfValuesDf = 0;
  //           var summotorAmpData = 0;
  //           var summotorKwhData = 0;

  //           var filteredValuesPump = pumpRpmData.data[0].values.filter((x) => {
  //             return this.checkDateValue(x, startDate);
  //           })

  //           var filteredValuesDp = dischargePressureData.data[0].values.filter((x) => {
  //             return this.checkDateValue(x, startDate);
  //           })

  //           var filteredValuesDf = dischargeFlowData.data[0].values.filter((x) => {
  //             return this.checkDateValue(x, startDate);
  //           })

  //           var filteredValuesMAmp = motorAmpData.data[0].values.filter((x) => {
  //             return this.checkDateValue(x, startDate);

  //           })

  //           var filteredValuesKwh = motorKwhData.data[0].values.filter((x) => {
  //             return this.checkDateValue(x, startDate);
  //           })



  //           if (filteredValuesPump.length > 0) {
  //             filteredValuesPump.map(x => {
  //               sumOfValuesPump += x.value
  //             })
  //             var avg = sumOfValuesPump / filteredValuesPump.length;
  //             model.avgOfPumpRpm = avg;
  //           }

  //           if (filteredValuesDp.length > 0) {
  //             filteredValuesDp.map(x => {
  //               sumOfValuesDp += x.value
  //             })
  //             var avg2 = sumOfValuesDp / filteredValuesDp.length;
  //             model.avgOfDischargePressure = avg2;
  //           }

  //           if (filteredValuesDf.length > 0) {
  //             filteredValuesDf.map(x => {
  //               sumOfValuesDf += x.value
  //             })
  //             var avg2 = sumOfValuesDf / filteredValuesDf.length;
  //             model.avgOfDischargeFlow = avg2;
  //           }

  //           if (filteredValuesMAmp.length > 0) {
  //             filteredValuesMAmp.map(x => {
  //               summotorAmpData += x.value
  //             })
  //             var avg2 = summotorAmpData / filteredValuesMAmp.length;
  //             model.avgmotorAmpData = avg2;
  //           }

  //           if (filteredValuesKwh.length > 0) {
  //             filteredValuesKwh.map(x => {
  //               summotorKwhData += x.value
  //             })
  //             var avg2 = summotorKwhData / filteredValuesKwh.length;
  //             model.avgmotorKwhData = avg2;
  //           }



  //           listofmodel.push(model)

  //           startDate.setDate(startDate.getDate() + 1);
  //           nextDate.setDate(nextDate.getDate() + 1)
  //         }
  //       }
  //       else if (filterType == 'Yearly') {
  //         const monthNames = [
  //           "January", "February", "March", "April", "May", "June",
  //           "July", "August", "September", "October", "November", "December"
  //         ];

  //         var startDate = from1;
  //         var nextDate = new Date(from1);
  //         nextDate.setMonth(startDate.getMonth() + 1);

  //         var endDate = to1;

  //         while (startDate.getTime() <= endDate.getTime()) {

  //           var model = {
  //             date: monthNames[startDate.getMonth()],
  //             avgOfPumpRpm: 0,
  //             avgOfDischargePressure: 0,
  //             avgOfDischargeFlow: 0,
  //             avgmotorAmpData: 0,
  //             avgmotorKwhData: 0,
  //           };

  //           var sumOfValuesPump = 0;
  //           var sumOfValuesDp = 0;
  //           var sumOfValuesDf = 0;
  //           var summotorAmpData = 0;
  //           var summotorKwhData = 0;


  //           var filteredValuesPump = pumpRpmData.data[0].values.filter((x) => {
  //             const valueDate = new Date(x.timestamp);
  //             if (valueDate.getMonth() == startDate.getMonth()) {
  //               return true;
  //             }
  //             else {
  //               return false;
  //             }
  //           })

  //           var filteredValuesDp = dischargePressureData.data[0].values.filter((x) => {
  //             const valueDate = new Date(x.timestamp);
  //             if (valueDate.getMonth() == startDate.getMonth()) {
  //               return true;
  //             }
  //             else {
  //               return false;
  //             }
  //           })

  //           var filteredValuesDf = dischargeFlowData.data[0].values.filter((x) => {
  //             const valueDate = new Date(x.timestamp);
  //             if (valueDate.getMonth() == startDate.getMonth()) {
  //               return true;
  //             }
  //             else {
  //               return false;
  //             }
  //           })

  //           var filteredValuesMAmp = motorAmpData.data[0].values.filter((x) => {
  //                const valueDate = new Date(x.timestamp);
  //             if (valueDate.getMonth() == startDate.getMonth()) {
  //               return true;
  //             }
  //             else {
  //               return false;
  //             }
  //           })

  //           var filteredValuesKwh = motorKwhData.data[0].values.filter((x) => {
  //                const valueDate = new Date(x.timestamp);
  //             if (valueDate.getMonth() == startDate.getMonth()) {
  //               return true;
  //             }
  //             else {
  //               return false;
  //             }
  //           })



  //           if (filteredValuesPump.length > 0) {
  //             filteredValuesPump.map(x => {
  //               sumOfValuesPump += x.value
  //             })
  //             var avg = sumOfValuesPump / filteredValuesPump.length;
  //             model.avgOfPumpRpm = avg;
  //           }

  //           if (filteredValuesDp.length > 0) {
  //             filteredValuesDp.map(x => {
  //               sumOfValuesDp += x.value
  //             })
  //             var avg2 = sumOfValuesDp / filteredValuesDp.length;
  //             model.avgOfDischargePressure = avg2;
  //           }

  //           if (filteredValuesDf.length > 0) {
  //             filteredValuesDf.map(x => {
  //               sumOfValuesDf += x.value
  //             })
  //             var avg2 = sumOfValuesDf / filteredValuesDf.length;
  //             model.avgOfDischargeFlow = avg2;
  //           }

  //           if (filteredValuesMAmp.length > 0) {
  //             filteredValuesMAmp.map(x => {
  //               summotorAmpData += x.value
  //             })
  //             var avg2 = summotorAmpData / filteredValuesMAmp.length;
  //             model.avgmotorAmpData = avg2;
  //           }

  //           if (filteredValuesKwh.length > 0) {
  //             filteredValuesKwh.map(x => {
  //               summotorKwhData += x.value
  //             })
  //             var avg2 = summotorKwhData / filteredValuesKwh.length;
  //             model.avgmotorKwhData = avg2;
  //           }

  //           listofmodel.push(model)

  //           startDate.setMonth(startDate.getMonth() + 1);
  //           nextDate.setMonth(nextDate.getMonth() + 1)
  //         }

  //       }

  //       return listofmodel
  //     }));
  //   }
  // }

  checkDateValue(x, startDate,benchNu1,benchNUSelected): boolean {
    
    const valueDate = new Date(x.timestamp)

    if ((valueDate.getDate() == startDate.getDate()) && (benchNu1 == benchNUSelected)) {
      return true;
    }
    else {
      return false;
    }
  }

  getTestObjectCount(variableId, startTime, endDate) {
    var timeString = this.getDateString(startTime, endDate) + '&order=Descending'
    if (environment.production) {
      var url = `DataService/Data/${variableId}?${timeString}`
      var model = {
        url: url
      }
      return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id`, model).pipe(map((data: any) => {
        var totalData = []
        const variableData = data.data as VariableReceived[]

        variableData[0].values.map(x => {
          if (!totalData.includes(x.value)) {
            totalData.push(x.value)
          }
        });
        return totalData.length;
      }));
    }

    else {
      return this.http.get(`${this.baseUrl}DataService/Data/${variableId}?${timeString}`).pipe(map((data: any) => {
        var totalData = []
        const variableData = data.data as VariableReceived[]

        variableData[0].values.map(x => {
          if (!totalData.includes(x.value)) {
            totalData.push(x.value)
          }
        });
        return totalData.length;
      }));
    }

  }

  getVariables()
  {
    var model = {
      url:'',
      json:''
    }
    return this.http.post(`http://192.168.4.214:8090/api/EdgeService/get-data-by-variable-id`,model)
  }

  getProjectRunTime(Group) {

    if (environment.production) {
      if(Group == 'A'){
        var model111 = [
          {
            "variableId": "a2ac29d0fd7e4e2980c557dce49afc39",
            "order": "Descending",
            "limit":1
          },
          {
            "variableId": "309c20f7b88b4c6cb26c535f4c5a78ad",
            "order": "Descending",
            "limit":1
          },
        ]
      }else {
        var model111 = [
          {
            "variableId": "4d8e32805834474c8a770112b28fd494",
            "order": "Descending",
            "limit":1
          },
          {
            "variableId": "96cdf424b52945e2ad45045a7ae5ed49",
            "order": "Descending",
            "limit":1
          },
        ]
      }
      //0 - TestRun_Time, 1- TestRun_ProjectId_No
      
      var url = `DataService/Data/Bulk/Read`;
      var model1 = {
        url: url,
        json: model111
      }
      return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model1).pipe(map((data: any) => {
        var projId = data[1]?.data[0]?.values[0]?.value;
        var seconds = 0;
        data[1]?.data[0]?.values.map((x, i) => {

          if (x.value == projId) {
            seconds += data[0]?.data[0]?.values[i]?.value;
          }
        })
        return seconds
      }))
    }
    else {
      //0 - TestRun_Time, 1- TestRun_ProjectId_No
      var model111 = [
        {
          "variableId": "4c2f640c61714b67899f4d0238466ca1",
          "order": "Descending",
          "limit":1
        },
        {
          "variableId": "9647d40f4a8c4b8daa8f5922e1d46bd2",
          "order": "Descending",
          "limit":1
        },
      ]
      return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, model111).pipe(map((data: BulkData[]) => {
       
        var projId = data[1]?.data[0]?.values[0]?.value;
        var seconds = 0;
        data[1]?.data[0]?.values.map((x, i) => {

          if (x.value == projId) {
            seconds += data[0]?.data[0]?.values[i]?.value;
          }
        })

        return seconds
      }));
    }

  }

  getBenchStatus() {    //0-TestingState2 

    var TestingState = this.variableList.filter(x => x.variableName == "TestingState")[0].variableId;

    if (environment.production) {
      var model111 = [
        {
          "variableId": 'e2b4850fe5e7461692428c7ada79556c',
          "order": "Descending",
          "limit": 1
        },
        {
          "variableId": "5a007fb7609e425fb38307a138027db9",
          "order": "Descending",
          "limit": 1
        },
      ]
      var url = `DataService/Data/Bulk/Read`;
      var model1 = {
        url: url,
        json: model111
      }
      return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model1).pipe(map((data: BulkData[]) => {
      

        const id = data[0].data[0].values[0]?.value;
        const id2 = data[1].data[0].values[0]?.value;

        var model = {
          running: 0,
          available: 7
        }
    
        if (id == 2) {
          model.running += 1
          model.available -= 1
        }
        if (id2 == 2) {
          model.running += 1
          model.available -= 1
        }
        return model
      }))
    }
    else {
      var model111 = [
        {
          "variableId": '130db27c440e4749a826fbfd06628598',
          "order": "Descending",
          "limit": 1
        },
        {
          "variableId": TestingState,
          "order": "Descending",
          "limit": 1
        },
      ]
      return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, model111).pipe(map((data: BulkData[]) => {

        const id = data[0].data[0].values[0].value;
        const id2 = data[1].data[0].values[0]?.value;
        var model = {
          running: 0,
          available: 7
        }

        if (id == 2) {
          model.running += 1
          model.available -= 1
        }
        if (id2 == 2) {
          model.running += 1
          model.available -= 1
        }
        return model
      }));
    }
  }

  getDoubleDigDateValue(dateValue) {
    if (dateValue < 10) {
      dateValue = "0" + dateValue;
    }
    return dateValue;
  }

  getDateString(startTime: Date, endTime: Date): string {

    var from = `from=${startTime.getFullYear()}-${this.getDoubleDigDateValue(startTime.getMonth() + 1)}-${this.getDoubleDigDateValue(startTime.getDate())}T${this.getDoubleDigDateValue(startTime.getHours())}:${this.getDoubleDigDateValue(startTime.getMinutes())}:${this.getDoubleDigDateValue(startTime.getSeconds())}.000Z&`;
    var tp = `to=${endTime.getFullYear()}-${this.getDoubleDigDateValue(endTime.getMonth() + 1)}-${this.getDoubleDigDateValue(endTime.getDate())}T${this.getDoubleDigDateValue(endTime.getHours())}:${this.getDoubleDigDateValue(endTime.getMinutes())}:${this.getDoubleDigDateValue(endTime.getSeconds())}.000Z`;
    return (from + tp)
  }

  getValidDateString(date: Date): string {
    var dateValue = `${date.getFullYear()}-${this.getDoubleDigDateValue(date.getMonth() + 1)}-${this.getDoubleDigDateValue(date.getDate())}T${this.getDoubleDigDateValue(date.getHours())}:${this.getDoubleDigDateValue(date.getMinutes())}:${this.getDoubleDigDateValue(date.getSeconds())}.000Z`;
    return dateValue;
  }

  openAirQualityChartDialog(data: any): void {
    this.dialog.open(MainDashboardComponent, {
      height: '40%',
      width: '60%',
      data: data,
    });
  }
}
