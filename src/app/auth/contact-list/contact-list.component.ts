import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactUsService } from 'src/app/shared/services/contactus.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {

  documentList : any;

  constructor(private router: Router,
    public contactService:ContactUsService,) { }

  ngOnInit() {
    this.getDocumentData();
  }

  getDocumentData(){
    this.contactService.getAllContact().subscribe(product => { 
      this.documentList = product;
      console.log(this.documentList);
    });
  }

  deleteContact(id){
    this.contactService.deleteContact(id).subscribe(res => {
      console.log(res);
      this.getDocumentData();
    });

  }
  

}
