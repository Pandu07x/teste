import { Injectable } from '@angular/core';
import { User, localStorageModel } from '../_model/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user:User;
  accessToken;
  // private apiUrl = 'http://localhost:3000/api';
  private apiUrl = 'http://ec2-44-195-141-134.compute-1.amazonaws.com/api';
  constructor(private http: HttpClient) {

    if(sessionStorage.getItem('userInfo'))
    {
      const user = JSON.parse(sessionStorage.getItem('userInfo')) as localStorageModel;
      this.user = user.user;
      this.accessToken = user.access_token
    }
   }

   login(loginObj:any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, loginObj);
  }

  getUserPermissions():string[]
  {
    const user = JSON.parse(sessionStorage.getItem('userInfo')) as localStorageModel;
    this.user = user.user;
    var listOFPermissions = this.user.permissions.split(",");
    return listOFPermissions
  }

  get access_token()
  {
    return this.accessToken;
  }

  get isLoggedIn(){
    return sessionStorage.getItem('userInfo');
  }


}
