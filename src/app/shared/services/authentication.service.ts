import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import{ environment } from '../../../environments/environment'
import { Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(private http: HttpClient, private router: Router) {
        
    }

    // public get loggedIn(): boolean {  
    //     return (localStorage.getItem('currentUser') !== null);  
    // } 

    login(data) {
        return this.http.post<any>(`${environment.apiUrl}/user/login`, data)
            .pipe(map(user => {
                // login successful if there's a user in the response
                if (user) {
                    // store user details and basic auth credentials in local storage 
                    // to keep user logged in between page refreshes
                    //user.authdata = window.btoa(data);
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
      let token =  localStorage.removeItem('currentUser');
      if(token == null && token == undefined){
        this.router.navigate(['/login']);
      }  
    }

    getToken(){
        return localStorage.getItem('currentUser');
    }

    requestReset(data): Observable<any> {
        return this.http.post(`${environment.apiUrl}/user/forgot_password`, data);
    }
    
    newPassword(data): Observable<any> {
        return this.http.post(`${environment.apiUrl}/user/reset_password`, data);
    }
    
    // ValidPasswordToken(data): Observable<any> {
    //     return this.http.post(`${environment.apiUrl}/valid-password-token`, data);
    // }


    

}