import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import{ environment } from '../../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class UserService {

    constructor(private http: HttpClient) { }

    
    getUserDetails() {
        return this.http.get<User[]>(`${environment.apiUrl}/user/details`);
    }

    getById(id: string) {
        return this.http.get(`${environment.apiUrl}/user/` + id);
    }
    
    register(user) {
        return this.http.post(`${environment.apiUrl}/user/signup`, user);
    }

    addProduct(data): Observable<any> {
        console.log('Servicedat', data)
        return this.http.post(`${environment.apiUrl}/products/add`, data);
    }

    requestReset(data): Observable<any> {
        return this.http.post(`${environment.apiUrl}/user/forgot_password`, data);
    }
    
    newPassword(data): Observable<any> {
        return this.http.post(`${environment.apiUrl}/new-password`, data);
    }
    
    ValidPasswordToken(data): Observable<any> {
        return this.http.post(`${environment.apiUrl}/valid-password-token`, data);
    }
    


    update(user: User) {
        return this.http.put(`/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/` + id);
    }

}