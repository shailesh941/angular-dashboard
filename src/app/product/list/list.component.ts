import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  productList:any;

  constructor(private router: Router,
    public userService:UserService,) { }

  ngOnInit() {
    this.getUserData();
  }

  getUserData(){
    this.userService.getAllProduct().subscribe(product => { 
      this.productList = product;
      console.log(this.productList);
    });
  }

}
