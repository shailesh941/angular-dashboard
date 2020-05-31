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

  constructor(private router: Router,
    public productService:ProductService,) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData(){
    this.productService.getAllProduct().subscribe(product => { 
      this.productList = product;
      console.log(this.productList);
    });
  }

}
