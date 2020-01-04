import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  toggleMenu = 0;
  smallMenuBox:boolean=false;

  constructor() { }

  ngOnInit() {
  }

  menuOpen(event){
    if(this.toggleMenu == event){
      this.toggleMenu = 0;
    }else{
      this.toggleMenu = event;
    }
  }
  smallMenu(){
    this.toggleMenu = 0;
    this.smallMenuBox = !this.smallMenuBox;
  }



}
