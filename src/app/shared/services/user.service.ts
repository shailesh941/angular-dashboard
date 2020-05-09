import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import{ environment } from '../../../environments/environment'



@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${environment.apiUrl}/products/alllist`);
    }

    getUserDetails() {
        return this.http.get<User[]>(`${environment.apiUrl}/user/details`);
    }

    getById(id: string) {
        return this.http.get(`${environment.apiUrl}/user/` + id);
    }

    getFilterData(data) {
        return this.http.post(`${environment.apiUrl}/products/list`, data);
    }

    register(user) {
        return this.http.post(`${environment.apiUrl}/user/signup`, user);
    }

    update(user: User) {
        return this.http.put(`/users/` + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/` + id);
    }

}