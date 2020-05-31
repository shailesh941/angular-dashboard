import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{ environment } from '../../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ContactUsService {

    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    getAllContact() {
        return this.http.get<any[]>(`${environment.apiUrl}/contact/list`);
    }

    addContact(data:any): Observable<any> {
        return this.http.post<any>(`${environment.apiUrl}/contact/add`, data, {
          reportProgress: true,
          observe: 'events'
        })
    }

    getSingleContact(id) {
      return this.http.get<any[]>(`${environment.apiUrl}/contact/${id}`);
    }

    updateContact(data:any) {
      //let body = JSON.stringify(data);
      return this.http.put<any>(`${environment.apiUrl}/contact/update/${data._id}`, data) 

    }

    deleteContact(id) {
      return this.http.delete(`${environment.apiUrl}/contact/delete/${id}`);
    }


    

}