import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtHelper } from '../_helper/jwt-helper';
import { User, localStorageModel } from '../_model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  header;
  access_token: localStorageModel;
  constructor(private http: HttpClient, private route: Router) {

  }

  logIN(model) {
    return this.http.post(`${environment.API_URL}account/login`, model).pipe(map((data: any) => {
      const jwt = new JwtHelper()
      const user = jwt.decodeToken(data.access_token) as User;
      var model: localStorageModel = {
        access_token: data.access_token,
        user: user
      }
      sessionStorage.setItem('userInfo', JSON.stringify(model))
      return data
    }));
  }

  addToken()
  {
    return this.http.get(`${environment.API_URL}account/set-cookie`);

  }

  getAllUsers() {
    return this.http.get(`${environment.API_URL}account/get-all-users`, { headers: this.header })
  }

  getAllRoles() {
    return this.http.get(`${environment.API_URL}account/get-roles`, { headers: this.header })
  }

  deleteRole(model)
  {
    return this.http.post(`${environment.API_URL}account/delete-role`, model ,{ headers: this.header })
  }
  
  deleteUser(model)
  {
    return this.http.post(`${environment.API_URL}account/delete-user`, model ,{ headers: this.header })
  }

  getRoleById(id)
  {
    return this.http.get(`${environment.API_URL}account/get-role-byid?id=${id}`, { headers: this.header })

  }

  createRole(model) {
    return this.http.post(`${environment.API_URL}account/createRole`, model, { headers: this.header })
  }

  updateRole(model) {
    return this.http.post(`${environment.API_URL}account/update-role`, model, { headers: this.header })
  }

  up

  getRolePermissions(roleName) {
    return this.http.get(`${environment.API_URL}account/get-role-claims?roleName=${roleName}`, { headers: this.header })
  }

  createNewUSer(modle) {
    return this.http.post(`${environment.API_URL}account/createUser`, modle, { headers: this.header })
  }

  updateUser(model)
  {
    return this.http.post(`${environment.API_URL}account/updateuser`, model, { headers: this.header })

  }

  logOut() {
    sessionStorage.clear()
    this.route.navigate(['/'])
  }

  getUserByID(id)
  {
    return this.http.get(`${environment.API_URL}account/get-user-byid?id=${id}`, { headers: this.header })
  }
}
