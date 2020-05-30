import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{ environment } from '../../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ProductService {


    constructor(private http: HttpClient) { }

    addProduct(data): Observable<any> {
        console.log('Servicedat', data)
        var formData: any = new FormData();

        formData.append("product_code", data.product_code);
        //formData.append("avatar", profileImage);

        return this.http.post(`${environment.apiUrl}/products/add`, data);
    }
    

}