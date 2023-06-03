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

  public getCurrentApplicationList() : Observable<any[]> {
    var url = this.baseUrl + 'Applications/GetСurrentApplication';
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
    var url = this.baseUrl + 'ApplicationUsers/PartExists';
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

  public addApplication(token: any, name: any, description: any,
                        idCity: any, place: any, date: any, userCount: any, userId: any): Observable<any> {
    var url = this.baseUrl + 'Applications/Create';
    var head = {'token': token};
    return this.client.post<any>(url, {
      name: name,
      date: date,
      countUser: userCount,
      place: place,
      description: description,
      idCity: idCity,
      idUser: userId
    }, {headers: head})
  }

  public addPhoto(idApplication: any, photo: any): Observable<any> {
    var url = this.baseUrl + 'PhotoApplications/Create';
    return this.client.post<any>(url, {photo: photo, idapplicatioon: idApplication})
  }

  public deletePhoto(idApplication: any): Observable<any> {
    var url = this.baseUrl + `PhotoApplications/${idApplication}`;
    return this.client.delete<any>(url)
  }

  public getUserCreateApplication(idUser: any, token: any): Observable<any> {
    var url = this.baseUrl + 'Applications/UserCreateApplication';
    var head = {'token': token};
    return this.client.post<any>(url, {
      id: idUser
    }, {headers: head});
  }

  public getUserPartApplication(idUser: any, token: any): Observable<any> {
    var url = this.baseUrl + 'ApplicationUsers/UserPartApplication';
    var head = {'token': token};
    return this.client.post<any>(url, {
      id: idUser
    }, {headers: head});
  }

  public editApplication(token: any, id: any, name: any, description: any,
      idCity: any, place: any, date: any, userCount: any, userId: any): Observable<any> {
    var url = this.baseUrl + `Applications/${id}`;
    var head = {'token': token};
    return this.client.put<any>(url, {
      id: id,
      name: name,
      date: date,
      countUser: userCount,
      place: place,
      description: description,
      idCity: idCity
    }, {headers: head})
  }

  public deleteEvent(token: any, id: any): Observable<any> {
    var url = this.baseUrl + `Applications/Delete`;
    var head = {'token': token};
    return this.client.post<any>(url, {
      id: id
    }, {headers: head})
  }

  public sendMail(token: any, recipientEmail: any, subject: any, body: any ): Observable<any> {
    var url = this.baseUrl + 'Users/Mail';
    var head = {'token': token};
    return this.client.post<any>(url, {
      _recipientEmail: recipientEmail,
      _subject: subject,
      _body: body
    }, {headers: head})
  }

  // Выдает какие пользователи подписались на событие и инфа о них
  public GetPartUser(id: any): Observable<any> {
    var url = this.baseUrl + `ApplicationUsers/GetPartsUser?id=${id}`;
    return this.client.get<any>(url);
  }

  public GetUser(id: any): Observable<any> {
    var url = this.baseUrl + `Users/${id}`;
    return this.client.get<any>(url);
  }

  public GetStatistic(token: any, id: any): Observable<any> {
    var url = this.baseUrl + 'Users/Statistic';
    var head = {'token': token};
    return this.client.post<any>(url, {
      id: id
    }, {headers: head})
  }
}
