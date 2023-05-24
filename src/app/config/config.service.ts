import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ConfigService {
    baseUrl: string = "http://localhost:5189/api/";
  constructor(public client: HttpClient, private router: Router) { }

  public getApplicationList() : Observable<any[]> {
    var url = this.baseUrl + 'Applications';
    return this.client.get<any[]>(url)
  }

  public getApplication(id: any) : Observable<any> {
    var url = this.baseUrl + `Applications/${id}`;
    return this.client.get<any>(url)
  }

  public authorization(email: any, password: any) : Observable<any> {
    var url = this.baseUrl + 'Users/login';
    return this.client.post<any>(url, {
      email: email,
      password: password
    })
  }

  public getUserIdentifier(token: any) : Observable<any> {
    var url = this.baseUrl + 'Users/getIdentifier';
    return this.client.post<any>(url, {userPhoto: token})
  }

  public registration(name: any, surname: any, telephone: any, idCity: any, 
                      idGender: any, email: any, password: any) : Observable<any> {
    var url = this.baseUrl + 'Users/registration';
    return this.client.post<any>(url, {
      name: name,
      surname: surname, 
      telephone: telephone, 
      idCity: idCity, 
      idGender: idGender,
      email: email,
      password: password
    })
  }

  public getCities() : Observable<any[]> {
    var url = this.baseUrl + 'Cities';
    return this.client.get<any[]>(url)
  }

  public partApplicationUser(idApplication: any, token: any) :Observable<any> {
    var url = this.baseUrl + 'ApplicationUsers';
    var head = {'token': token};
    return this.client.post<any>(url, {idApplication: idApplication}, {headers: head});
  }

  public partExists(idApplication: any, idUser: any): Observable<any> {
    var url = this.baseUrl + 'ApplicationUsers/partExists';
    return this.client.post<any>(url, {
      idApplication: idApplication,
      idUser: idUser
    });
  }

  public deletePart(id: any, token: any) : Observable<any> {
    var url = this.baseUrl + `ApplicationUsers/${id}`;
    var head = {'token': token};
    return this.client.delete<any>(url, {headers: head});
  }
}
