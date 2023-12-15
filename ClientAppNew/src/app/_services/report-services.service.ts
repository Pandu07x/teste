import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConnectableObservable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { localStorageModel } from '../_model/user.model';
//import variableData from 'src/assets/VariablesListGroup_A.json'
import variableData from 'src/assets/Variables List/Production/IOT1-GA.json'
import { BulkData, Variable } from '../_model/Variables.Model';
import { DashboardService } from './dashboard.service';


@Injectable({
  providedIn: 'root'
})
export class ReportServicesService {
  variableList:Variable[] = variableData;
  baseUrl = environment.Edge_Url;
  apiUrl = environment.API_URL;
  access_token: localStorageModel;
  header;
  type2;

  constructor(private http: HttpClient, private timeService:DashboardService) {
    this.access_token = JSON.parse(sessionStorage.getItem("userInfo")) as localStorageModel
    this.header = new HttpHeaders({
      Authorization: 'Bearer ' + this.access_token?.access_token,
      'Content-Type': 'application/json',
      Accept: 'application/json, text/plain, */*'
    })
  
  }

  createColumn(model) {
    // create-column
    return this.http.post(`${this.apiUrl}reports/create-column`, model);
  }

  getTemplates() {
    return this.http.get(`${this.apiUrl}reports/get-templates`, { headers: this.header })
  }

  tableData = []

  getTableData(model)
  {
    if (environment.production) {
      var url = `DataService/Data/Bulk/Read`;
      var model1 = {
        url: url,
        json: model
      }
      return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model1).pipe(map((data: BulkData[]) => {
        return data
      }))
    }
    else {     
      return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, model).pipe(map((data: BulkData[]) => {
    
        return data
      }));
    }
  }

  getProjectRunTime(projectId) {

    if (environment.production) {
      //0 - TestRun_Time, 1- TestRun_ProjectId_No
      var model111 = [
        {
          "variableId": "a2ac29d0fd7e4e2980c557dce49afc39",
          "order": "Descending",
          "limit":2
        },
        {
          "variableId": "309c20f7b88b4c6cb26c535f4c5a78ad",
          "order": "Descending",
          "limit":2
        },
      ]
      var url = `DataService/Data/Bulk/Read`;
      var model1 = {
        url: url,
        json: model111
      }

      return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model1).pipe(map((data: any) => {
        // var projId = data[1]?.data[0]?.values[0]?.value;
        // var seconds = 0;
        // data[1]?.data[0]?.values.map((x, i) => {

        //   if (x.value == projId) {
        //     seconds = data[0]?.data[0]?.values[i]?.timestamp;
        //     console.log(data,'value')
        //   }
        // })
        // console.log(seconds,'return')
        // return seconds
        var projtId = data[1]?.data[0]?.values[0]?.value;
        var seconds ;
        data[1]?.data[0]?.values.map((x, i) => {
          
          if (x.value == projtId) {
            seconds = data[1].data[0].values[0].timestamp;
            
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
          "limit":2
        },
        {
          "variableId": "9647d40f4a8c4b8daa8f5922e1d46bd2",
          "order": "Descending",
          "limit":2
        },
      ]
      return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, model111).pipe(map((data: BulkData[]) => {
      
        var seconds ;
        data[1]?.data[0]?.values.map((x, i) => {
          if (x.value == projectId) {
            seconds = data[0]?.data[0]?.values[i]?.timestamp;
          }
        })
      
        return seconds
      }));
    }

  }

  getProjectRunTime2(projectId, groupname) {

    if (environment.production) {
      var url = `DataService/Data/Bulk/Read`;
      var model1 = {
        url: url,
        json: {}
      }
    
      // 0 - TestRun_Time, 1- TestRun_ProjectId_No
      var model111 = [
        {
          "variableId": "a2ac29d0fd7e4e2980c557dce49afc39",
          "order": "Descending",
          "limit": 2
        },
        {
          "variableId": "309c20f7b88b4c6cb26c535f4c5a78ad",
          "order": "Descending",
          "limit": 2
        },
      ]
      var model112 = [
        {
          "variableId": "4d8e32805834474c8a770112b28fd494",
          "order": "Descending",
          "limit": 2
        },
        {
          "variableId": "96cdf424b52945e2ad45045a7ae5ed49",
          "order": "Descending",
          "limit": 2
        },
      ]
    
      if (groupname == 'A') {
        model1.json = model111;
      } else if (groupname == 'B') {
        model1.json = model112;
      }
    
      return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model1).pipe(map((data: any) => {
       
        // Check if values array exists for group B
        var valuesArray = data[1]?.data[0]?.values;
        if (valuesArray && valuesArray.length > 0) {
          var projtId = valuesArray[0]?.value;
          var seconds = 0;
    
          valuesArray.forEach((x, i) => {
            if (x.value == projtId) {
              seconds += data[0]?.data[0]?.values?.[i]?.timestamp;
            }
          });
      
          return seconds;
        } else {
          return null; // Handle the case where valuesArray is null or empty
        }
      }));
    }
    else {
      //0 - TestRun_Time, 1- TestRun_ProjectId_No
      var model111 = [
        {
          "variableId": "4c2f640c61714b67899f4d0238466ca1",
          "order": "Descending",
          "limit":2
        },
        {
          "variableId": "9647d40f4a8c4b8daa8f5922e1d46bd2",
          "order": "Descending",
          "limit":2
        },
      ]
      return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, model111).pipe(map((data: BulkData[]) => {
      
        var seconds ;
        data[1]?.data[0]?.values.map((x, i) => {
        
          if (x.value == projectId) {
            seconds = data[0]?.data[0]?.values[i]?.timestamp;
          }
        })
      
        return seconds
      }));
    }

  }
  getProjectNames(model)
  {
    if (environment.production) {
      var url = `DataService/Data/Bulk/Read`;
      var model1 = {
        url: url,
        json: model
      }
      return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model1).pipe(map((data: BulkData[]) => {
        var projectGA = data[0]?.data[0]?.values;
        var projectGB = data[1]?.data[0]?.values;
        var listOfProjects = []
        projectGA.map(x => {
          if(!listOfProjects.includes(x.value) && x.value != '')
          listOfProjects.push(x.value)
        })
        projectGB.map(x => {
          if(!listOfProjects.includes(x.value) && x.value != '')
          listOfProjects.push(x.value)
        })
    
        return listOfProjects
      }))
    }
    else {     
      return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, model).pipe(map((data: BulkData[]) => {
        var projectGA = data[0]?.data[0]?.values;
        var projectGB = data[1]?.data[0]?.values;
        var listOfProjects = []
        projectGA.map(x => {
          if(!listOfProjects.includes(x.value) && x.value != '')
          listOfProjects.push(x.value)
        })
        projectGB.map(x => {
          if(!listOfProjects.includes(x.value) && x.value != '')
          listOfProjects.push(x.value)
        })
    
        return listOfProjects
      }));
    }
  }

  getColsList() {
    return this.http.get(`${this.apiUrl}reports/get-all-columns`)
  }

  createTemplate(model) {
    return this.http.post(`${this.apiUrl}reports/create-template`, model)
  }

  getRoles() {
    return this.http.get(`${this.apiUrl}account/get-roles`, { headers: this.header }).pipe(map((data) => {
      return data
    }))
  }

  getTestBenchChart(variableList: string[], from1: Date, to1: Date, filterType) {
    // Variable list ['Pump RPM','Discharge Pressure','DischargeFlow']
    var modelList = [];
    var from = this.timeService.getValidDateString(from1);
    var to = this.timeService.getValidDateString(to1);
   
    for (let i = 0; i < variableList.length; i++) {
      var model = {
        "variableId": variableList[i],
        "order": 'Descending',
        "from": from,
        "to": to
      }
      modelList.push(model);
    }
    if (environment.production) {

      var url = `DataService/Data/Bulk/Read`

      var model1 = {
        url: url,
        json: JSON.stringify(modelList)
      }

      return this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model1).pipe(map((data: any) => {
        return data
      }));

    }
    else {
      return this.http.post(`${this.baseUrl}DataService/Data/Bulk/Read`, modelList).pipe(map((data: BulkData[]) => {
        return data
      }));
    }
  }

  checkDateValue(x, startDate): boolean {
    
    const valueDate = new Date(x.timestamp)

    if ((valueDate.getDate() == startDate.getDate())) {
      return true;
    }
    else {
      return false;
    }
  }


  listOfProjId = [];
  //model2 = []
  reportData = []

  getReportData(model){
     var data = this.http.post(`${this.apiUrl}EdgeService/get-data-by-variable-id-bulk`, model)
     return data
    //  data.subscribe({
    //   next: (data: BulkData[]) => {
    //     //this.spinner.hide();

    //     data[0].data[0].values.map((x, i) => {
    //       if (this.typeChange(data[6].data[0].values[i].value) == this.type2) {
    //         if (!this.listOfProjId.includes(x.value.toString())) {
    //           this.getProjectRunTime(data[0].data[0].values[i].value).subscribe((data2)=>{
               
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
    //               this.reportData.push(model2)
    //               // this.tableData.push(model2)
    //               // this.dataSource123.data = this.tableData
    //               console.log(model2,'report data')
    //             //}
    //           })
    //         }     
    //       }
    //       return this.reportData
          
    //     });
        
    //     //this.spinner.hide()
        
    //   },
    //   error: (err) => {
    //     //this.spinner.hide()
    //   }
    // });
    // console.log(this.reportData)
    // return this.reportData
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

}

