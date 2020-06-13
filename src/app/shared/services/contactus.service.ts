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

    addContact(data:any, profileImage: File): Observable<any> {

      var formData: any = new FormData();
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("email", data.email);
        formData.append("mobile", data.mobile);
        formData.append("address", data.address);
        formData.append("state", data.state);
        formData.append("city", data.city);
        formData.append("pinno", data.pinno);
        formData.append("avatar", profileImage);

        return this.http.post<any>(`${environment.apiUrl}/contact/add`, formData, {
          reportProgress: true,
          observe: 'events'
        })
    }

    getSingleContact(id) {
      return this.http.get<any[]>(`${environment.apiUrl}/contact/${id}`);
    }

    updateContact(data:any, profileImage: File) {
      //let body = JSON.stringify(data);
      var formData: any = new FormData();
        formData.append("firstName", data.firstName);
        formData.append("lastName", data.lastName);
        formData.append("email", data.email);
        formData.append("mobile", data.mobile);
        formData.append("address", data.address);
        formData.append("state", data.state);
        formData.append("city", data.city);
        formData.append("pinno", data.pinno);
        formData.append("avatar", profileImage);
        
      return this.http.put<any>(`${environment.apiUrl}/contact/update/${data._id}`, formData) 

    }

    deleteContact(id) {
      return this.http.delete(`${environment.apiUrl}/contact/delete/${id}`);
    }


    

}