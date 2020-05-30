import { Injectable } from '@angular/core';
import{ environment } from '../../../environments/environment'
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { Documentdata } from '../models/document';

@Injectable({
  providedIn: 'root'
})

export class DocumentService {

  headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private http: HttpClient) { }

  // Get Users
  getUsers() {
    //return this.http.get(this.baseURL)
  }

  // Create User
  addUser(data:any, profileImage: File): Observable<any> {
    var formData: any = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("avatar", profileImage);

    console.log(formData)

    return this.http.post<Documentdata>(`${environment.apiUrl}/documents/add`, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  // Error handling 
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}