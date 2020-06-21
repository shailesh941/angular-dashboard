import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  productList:any;
  filterdata ={
    product_cat:'',
    page:1,

  }

  constructor(private router: Router,
    public productService:ProductService,) { }

  ngOnInit() {
    this.getUserData();
  }
  filterMethod(event){
    this.filterdata.product_cat = event.target.value;
    console.log(event.target.value)
    this.getUserData();
  }
  pageSelect(event){
    this.filterdata.page = event;
    this.getUserData();
  }

  getUserData(){
    this.productService.getAllProduct(this.filterdata).subscribe(product => { 
      console.log('Dat',product);
      this.productList = product;
      console.log(this.productList);
    });
  }

  deleteContact(id){
    this.productService.deleteContact(id).subscribe(res => {
      this.getUserData();
    });

  }

}
