  import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { map } from 'rxjs';
  //import variableData from 'src/assets/VariablesListGroup_A.json'
  import { environment } from 'src/environments/environment';
  import { BulkData, Variable } from '../_model/Variables.Model';
  // import VariableGrpA from 'src/assets/Variables List/Development/IOT1-GA.json'
  // import VariableGrpB from 'src/assets/Variables List/Development/IOT2-GB.json'

  import VariableGrpA from 'src/assets/Variables List/Production/IOT1-GA.json'
  import VariableGrpB from 'src/assets/Variables List/Production/IOT2-GB.json'

  @Injectable({
    providedIn: 'root'
  })
  export class TestBenchListServiceService {
    baseUrl = environment.Edge_Url;
    apiUrl = environment.API_URL;
    variableListGA: Variable[] = VariableGrpA
    variableListGB: Variable[] = VariableGrpB
    constructor(private http: HttpClient) {

    }

    // getTestBenchRunningStatus() {
    //   var startTime = new Date();
    //   startTime.setDate(startTime.getDate() - 30);
    //   var endDate = new Date();
    //   const variableIdTestBenchGA = this.variableListGA.filter(x => x.variableName == "TestBenchNo")[0].variableId;
    //   const variableIdTestBenchGB = this.variableListGB.filter(x => x.variableName == "TestBenchNo")[0].variableId;
    //   const variableTestStateGA = this.variableListGA.filter(x => x.variableName == "TestingState")[0].variableId;
    //   const variableIdStateGB  = this.variableListGB.filter(x => x.variableName == "TestingState")[0].variableId;
    //   const variableIdProjectTypeGA = this.variableListGA.filter(x => x.variableName == "ProjectType")[0].variableId;
    //   const variableIdProjectTypeGB = this.variableListGB.filter(x => x.variableName == "ProjectType")[0].variableId;
    //   //  const variableId3 = this.variableList.filter(x => x.variableName == "TestingState")[0].variableId;

    //   var listOfIds = [variableIdTestBenchGA, variableIdTestBenchGB, variableTestStateGA,variableIdStateGB,variableIdProjectTypeGA,variableIdProjectTypeGB];
    //   //console.log(listOfIds)
    //   var modelList = [];
    //   var from = this.getValidDateString(startTime);
    //   var to = this.getValidDateString(endDate);
    //   for (let i = 0; i < listOfIds.length; i++) {
    //     var model = {
    //       "variableId": listOfIds[i],
    //       "order": 'Descending',
    //       "from": from,
    //       "to": to,
    //       "limit": 1
    //     }
    //     modelList.push(model);
    //   }
    //   if (environment.production) {
    //     var url = `DataService/Data/Bulk/Read`

    //     var model2 = {
    //       url: url,
    //       json: modelList
    //     }
      
    //     return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model2).pipe(map((data: BulkData[]) => {
    //      console.log(data,'test bench data')
    //       var model = [
    //         {
    //         TestBenchName:'TestBench_1',
    //         Status:false,
    //         Type:'',
    //         Group:''
    //       },
    //         {
    //         TestBenchName:'TestBench_2',
    //         Status:false,
    //         Type:'',
    //         Group:''
    //       },
    //         {
    //         TestBenchName:'TestBench_3',
    //         Status:false,
    //         Type:'',
    //         Group:''
    //       },
    //         {
    //         TestBenchName:'TestBench_4',
    //         Status:false,
    //         Type:'',
    //         Group:''
    //       },
    //         {
    //         TestBenchName:'TestBench_5',
    //         Status:false,
    //         Type:'',
    //         Group:''
    //       },
    //         {
    //         TestBenchName:'TestBench_6',
    //         Status:false,
    //         Type:'',
    //         Group:''
    //       },
    //         {
    //         TestBenchName:'TestBench_7',
    //         Status:false,
    //         Type:'',
    //         Group:''
    //       },
    //     ]
    //       if(data[0].data[0].values.length > 0)
    //       {
    //         const value = data[0].data[0].values[0].value;
    //         var testBenchName = `TestBench_${value}`;
    //         var filteredModel = model.filter(x => x.TestBenchName == testBenchName)[0]
    //         filteredModel.Status = true 
    //         var stateCode = data[2].data[0].values[0].value
    //         var state = this.testingState(stateCode);
    //         if (state == 'Running') {
    //           var typeCode = data[4].data[0].values[0].value
    //           var type = this.typeChange(typeCode)
    //           filteredModel.Type = type
    //           filteredModel.Group = 'A'
    //         }
  
    //         //Grp B////////////////////////
    //         const value2 = data[1].data[0].values[0].value;
    //         var testBenchName2 = `TestBench_${value}`;
    //         var filteredModel1 = model.filter(x => x.TestBenchName == testBenchName2)[0]
    //         filteredModel1.Status = true 
    //         var stateCode1 = data[3].data[0].values[0].value
    //         var state1 = this.testingState(stateCode1);
    //         if (state1 == 'Running') {
    //           var typeCode1 = data[5].data[0].values[0].value
    //           var type1 = this.typeChange(typeCode1)
    //           filteredModel1.Type = type1
    //           filteredModel1.Group = 'B'
    //         }
    //         console.log(model,'test bench data')
    //         return model
    //       }
    //       else
    //       {
    //         return model
    //       }
     

    //       //Grp A//////////////////////////
    
    //     }))
    //   }
    //   else {
    //     return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, modelList).pipe(map((data: BulkData[]) => {
    //       var model = [
    //         {
    //         TestBenchName:'TestBench_1',
    //         Status:false,
    //         Type:'',
    //         Group:'A'
    //       },
    //         {
    //         TestBenchName:'TestBench_2',
    //         Status:false,
    //         Type:'',
    //         Group:'A'
    //       },
    //         {
    //         TestBenchName:'TestBench_3',
    //         Status:false,
    //         Type:'',
    //         Group:'A'
    //       },
    //         {
    //         TestBenchName:'TestBench_4',
    //         Status:false,
    //         Type:'',
    //         Group:'A'
    //       },
    //         {
    //         TestBenchName:'TestBench_5',
    //         Status:false,
    //         Type:'',
    //         Group:'A'
    //       },
    //         {
    //         TestBenchName:'TestBench_6',
    //         Status:false,
    //         Type:'',
    //         Group:'A'
    //       },
    //         {
    //         TestBenchName:'TestBench_7',
    //         Status:false,
    //         Type:'',
    //         Group:'A'
    //       },
    //     ]
    //     if(data[0].data[0].values.length > 0)
    //     {
    //       //Grp A//////////////////////////
    //       const value = data[0].data[0].values[0].value;
    //       var testBenchName = `TestBench_${value}`;
    //       var filteredModel = model.filter(x => x.TestBenchName == testBenchName)[0]
    //       if(data[2].data[0].values[0].value)
    //       {
    //         var stateCode = data[2].data[0].values[0].value
    //         var state = this.testingState(stateCode);
    //         if (state == 'Running') {
    //           filteredModel.Status = true 
    //           var typeCode = data[4].data[0].values[0].value
    //           var type = this.typeChange(typeCode)
    //           filteredModel.Type = type
    //           filteredModel.Group = 'A'
    //         }
    //         // else{
    //         //   filteredModel.Status = false 
    //         //   var typeCode = data[4].data[0].values[0].value
    //         //   console.log(typeCode)
    //         //   var type = this.typeChange(typeCode)
    //         //   filteredModel.Type = type
    //         //   filteredModel.Group = 'A'
    //         // }
    //       }
  
    //       //Grp B////////////////////////
    //       const value2 = data[1].data[0].values[0].value;
    //       var testBenchName2 = `TestBench_${value2}`;
    //       var filteredModel1 = model.filter(x => x.TestBenchName == testBenchName2)[0]
         
    //       if( data[3].data[0]?.values[0]?.value)
    //       {
    //         var stateCode1 = data[3].data[0]?.values[0]?.value
    //         var state1 = this.testingState(stateCode1);
    //         if (state1 == 'Running') {
    //           filteredModel1.Status = true 
    //           var typeCode1 = data[5].data[0].values[0].value
    //           var type1 = this.typeChange(typeCode1)
    //           filteredModel1.Type = type1
    //           filteredModel1.Group = 'B'
    //         }
    //         // else{
    //         //   filteredModel1.Status = false 
    //         //   var typeCode1 = data[5].data[0].values[0].value
    //         //   var type1 = this.typeChange(typeCode1)
    //         //   filteredModel1.Type = type1
    //         //   filteredModel1.Group = 'B'
    //         // }
    //       }
    //       return model
    //     }
    //     else
    //     {
    //       return model;
    //     }
    //   }))
    //   }
    // }
    getTestBenchRunningStatus() {
      var startTime = new Date();
      startTime.setDate(startTime.getDate() - 30);
      var endDate = new Date();
      const variableIdTestBenchGA = this.variableListGA.filter(x => x.variableName == "TestBenchNo")[0]?.variableId;
      const variableIdTestBenchGB = this.variableListGB.filter(x => x.variableName == "TestBenchNo")[0]?.variableId;
      const variableTestStateGA = this.variableListGA.filter(x => x.variableName == "TestingState")[0]?.variableId;
      const variableIdStateGB  = this.variableListGB.filter(x => x.variableName == "TestingState")[0]?.variableId;
      const variableIdProjectTypeGA = this.variableListGA.filter(x => x.variableName == "ProjectType")[0]?.variableId;
      const variableIdProjectTypeGB = this.variableListGB.filter(x => x.variableName == "ProjectType")[0]?.variableId;

      const variableIdProjectNoGA = this.variableListGA.filter(x => x.variableName == "ProjectNumber")[0]?.variableId;
      const variableIdProjectNoGB = this.variableListGB.filter(x => x.variableName == "ProjectNumber")[0]?.variableId;
      const variableIdProjectNameGA = this.variableListGA.filter(x => x.variableName == "ProjectName")[0]?.variableId;
      const variableIdProjectNameGB = this.variableListGB.filter(x => x.variableName == "ProjectName")[0]?.variableId;

      const variableIdTestRunCountGA = this.variableListGA.filter(x => x.variableName == "TestRunCount")[0]?.variableId;
      const variableIdTestRunCountGB = this.variableListGB.filter(x => x.variableName == "TestRunCount")[0]?.variableId;
      //  const variableId3 = this.variableList.filter(x => x.variableName == "TestingState")[0].variableId;

      var listOfIds = [variableIdTestBenchGA, variableIdTestBenchGB, variableTestStateGA,variableIdStateGB,variableIdProjectTypeGA,variableIdProjectTypeGB,
        variableIdProjectNoGA, variableIdProjectNoGB, variableIdProjectNameGA, variableIdProjectNameGB, variableIdTestRunCountGA, variableIdTestRunCountGB];

      var modelList = [];
      var from = this.getValidDateString(startTime);
      var to = this.getValidDateString(endDate);
      for (let i = 0; i < listOfIds.length; i++) {
        var model = {
          "variableId": listOfIds[i],
          "order": 'Descending',
          "from": from,
          "to": to,
          "limit": 1
        }
        modelList.push(model);
      }
      if (environment.production) {
        var url = `DataService/Data/Bulk/Read`

        var model2 = {
          url: url,
          json: modelList
        }
      
        return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model2).pipe(map((data: BulkData[]) => {
          var model = [
            { TestBenchName: 'TestBench_1', Status: false, Type: '', Group: '', ProjectName:'', ProjectNumber:'', TestRunCount:'' },
            { TestBenchName: 'TestBench_2', Status: false, Type: '', Group: '',  ProjectName:'', ProjectNumber:'', TestRunCount:'' },
            { TestBenchName: 'TestBench_3', Status: false, Type: '', Group: '', ProjectName:'', ProjectNumber:'', TestRunCount:'' },
            { TestBenchName: 'TestBench_4', Status: false, Type: '', Group: '', ProjectName:'', ProjectNumber:'', TestRunCount:'' },
            { TestBenchName: 'TestBench_5', Status: false, Type: '', Group: '', ProjectName:'', ProjectNumber:'', TestRunCount:'' },
            { TestBenchName: 'TestBench_6', Status: false, Type: '', Group: '', ProjectName:'', ProjectNumber:'',  TestRunCount:'' },
            { TestBenchName: 'TestBench_7', Status: false, Type: '', Group: '', ProjectName:'', ProjectNumber:'', TestRunCount:'' },
          ]
    
          if (data[0]?.data[0]?.values.length > 0) {
            const value = data[0]?.data[0]?.values[0]?.value;
           
            var testBenchName = `TestBench_${value}`;
            var filteredModel = model.find(x => x.TestBenchName == testBenchName);
          
            if (filteredModel) {
              var stateCode = data[2]?.data[0]?.values[0]?.value;
              //var stateCode = data[0]?.data[0]?.values[0]?.value;
              var state = stateCode ? this.testingState(stateCode) : null;
             
              if (state == 'Running') {
                filteredModel.Status = true;
                var typeCode = data[4]?.data[0]?.values[0]?.value;
                var ProjectNumber = data[6]?.data[0]?.values[0]?.value;
                var ProjectName = data[8]?.data[0]?.values[0]?.value;
                var testRunCount = data[10]?.data[0]?.values[0]?.value;
                var type = typeCode ? this.typeChange(typeCode) : null;
                filteredModel.Type = type;
                filteredModel.ProjectNumber = ProjectNumber
                filteredModel.ProjectName = ProjectName
                filteredModel.TestRunCount = testRunCount

                filteredModel.Group = 'A';
              } else{
                filteredModel.Status = false 
                var typeCode = data[4].data[0].values[0].value
                var ProjectNumber= data[6]?.data[0]?.values[0]?.value;
                var ProjectName = data[8]?.data[0]?.values[0]?.value;
                var testRunCount = data[10]?.data[0]?.values[0]?.value;
                var type = this.typeChange(typeCode)
                filteredModel.Type = type
                filteredModel.Group = 'A'
                filteredModel.ProjectNumber = ProjectNumber
                filteredModel.ProjectName = ProjectName
                filteredModel.TestRunCount = testRunCount
              }
            }
    
            // Grp B
            const value2 = data[1]?.data[0]?.values[0]?.value;
          
            var testBenchName2 = `TestBench_${value2}`;
            var filteredModel1 = model.find(x => x.TestBenchName == testBenchName2);
            if (filteredModel1) {
            
              var stateCode1 = data[3]?.data[0]?.values[0]?.value;
              var state1 = stateCode1 ? this.testingState(stateCode1) : null;
            
              if (state1 == 'Running') {
                filteredModel1.Status = true;
                var typeCode1 = data[5]?.data[0]?.values[0]?.value;
                var ProjectNumber1 = data[7]?.data[0]?.values[0]?.value;
                var ProjectName1 = data[9]?.data[0]?.values[0]?.value;
                var testRunCount1 = data[11]?.data[0]?.values[0]?.value;
                var type1 = typeCode1 ? this.typeChange(typeCode1) : null;
                filteredModel1.Type = type1;
                filteredModel1.ProjectNumber = ProjectNumber1
                filteredModel1.ProjectName = ProjectName1
                filteredModel1.Group = 'B';
                filteredModel1.TestRunCount = testRunCount1

              }
              else{
                filteredModel1.Status = false;
                var typeCode1 = data[5]?.data[0]?.values[0]?.value;
                var ProjectNumber1 = data[7]?.data[0]?.values[0]?.value;
                var ProjectName1 = data[9]?.data[0]?.values[0]?.value;
                var type1 = typeCode1 ? this.typeChange(typeCode1) : null;
                var testRunCount1 = data[11]?.data[0]?.values[0]?.value;
                filteredModel1.Type = type1;
                filteredModel1.ProjectNumber = ProjectNumber1
                filteredModel1.ProjectName = ProjectName1
                 filteredModel1.TestRunCount = testRunCount1
                filteredModel1.Group = 'B';
              }
            }
    
            return model;
          } else {
            return model;
          }
        }));
      } 
      else {
        return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, modelList).pipe(map((data: BulkData[]) => {
          var model = [
            {
            TestBenchName:'TestBench_1',
            Status:false,
            Type:'',
            Group:'A'
          },
            {
            TestBenchName:'TestBench_2',
            Status:false,
            Type:'',
            Group:'A'
          },
            {
            TestBenchName:'TestBench_3',
            Status:false,
            Type:'',
            Group:'A'
          },
            {
            TestBenchName:'TestBench_4',
            Status:false,
            Type:'',
            Group:'A'
          },
            {
            TestBenchName:'TestBench_5',
            Status:false,
            Type:'',
            Group:'A'
          },
            {
            TestBenchName:'TestBench_6',
            Status:false,
            Type:'',
            Group:'A'
          },
            {
            TestBenchName:'TestBench_7',
            Status:false,
            Type:'',
            Group:'A'
          },
        ]
        if(data[0].data[0].values.length > 0)
        {
          //Grp A//////////////////////////
          const value = data[0].data[0].values[0].value;
          var testBenchName = `TestBench_${value}`;
          var filteredModel = model.filter(x => x.TestBenchName == testBenchName)[0]
          if(data[2].data[0].values[0].value)
          {
            var stateCode = data[2].data[0].values[0].value
            var state = this.testingState(stateCode);
            if (state == 'Running') {
              filteredModel.Status = true 
              var typeCode = data[4].data[0].values[0].value
              var type = this.typeChange(typeCode)
              filteredModel.Type = type
              filteredModel.Group = 'A'
            }
            else{
              filteredModel.Status = false 
              var typeCode = data[4].data[0].values[0].value
              var type = this.typeChange(typeCode)
              filteredModel.Type = type
              filteredModel.Group = 'A'
            }
          }
  
          //Grp B////////////////////////
          const value2 = data[1].data[0].values[0].value;
          var testBenchName2 = `TestBench_${value2}`;
          var filteredModel1 = model.filter(x => x.TestBenchName == testBenchName2)[0]
         
          if( data[3].data[0]?.values[0]?.value)
          {
            var stateCode1 = data[3].data[0]?.values[0]?.value
            var state1 = this.testingState(stateCode1);
            if (state1 == 'Running') {
              filteredModel1.Status = true 
              var typeCode1 = data[5].data[0].values[0].value
              var type1 = this.typeChange(typeCode1)
              filteredModel1.Type = type1
              filteredModel1.Group = 'B'
            }
            // else{
            //   filteredModel1.Status = false 
            //   var typeCode1 = data[5].data[0].values[0].value
            //   var type1 = this.typeChange(typeCode1)
            //   filteredModel1.Type = type1
            //   filteredModel1.Group = 'B'
            // }
          }
          return model
        }
        else
        {
          return model;
        }
      }))
      }
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

    // testingState(num): string {
    //   console.log("num:", num);
    //   const states = ['Idle', 'Starting', 'Running', 'Holding', 'Hold', 'Resuming', 'Stopping', 'Stop'];
      
    //   if (num >= 0 && num < states.length) {
    //     return states[num];
    //   }
      
    //   return '';
    // }
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

    

  }
