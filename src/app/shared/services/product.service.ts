import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import{ environment } from '../../../environments/environment'
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })

export class ProductService {

    headers = new HttpHeaders().set('Content-Type', 'application/json');

    constructor(private http: HttpClient) { }

    getAllProduct() {
        return this.http.get<any[]>(`${environment.apiUrl}/products/list`);
    }

    addProduct(data:any, profileImage: File): Observable<any> {
        var formData: any = new FormData();
        formData.append("product_code", data.product_code);
        formData.append("product_name", data.product_name);
        formData.append("product_price", data.product_price);
        formData.append("product_dicripaton", data.product_dicripaton);
        formData.append("product_imges", profileImage);
    
        console.log(formData)
    
        return this.http.post<any>(`${environment.apiUrl}/products/add`, formData, {
          reportProgress: true,
          observe: 'events'
        })
    }

    getSingleProduct(id) {
      return this.http.get<any[]>(`${environment.apiUrl}/products/${id}`);
    }

    updateProduct(userid:any, data:any) {
      // let formData: any = new FormData();
      // formData.append("product_code", data.product_code);
      // formData.append("product_name", data.product_name);
      // formData.append("product_price", data.product_price);
      // formData.append("product_dicripaton", data.product_dicripaton);
      // formData.append("product_imges", profileImage);
        //return this.http.put(`/users/` + item.id, item);
      return this.http.put(`${environment.apiUrl}/products/update/${userid}`, data) 

    }


    

}