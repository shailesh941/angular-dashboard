import { Component, OnInit } from '@angular/core';
import { DocumentService } from 'src/app/shared/services/document.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  documentList : any;

  constructor(private router: Router,
    public documentService:DocumentService,) { }

  ngOnInit() {
    this.getDocumentData();
  }

  getDocumentData(){
    this.documentService.getAllDocument().subscribe(product => { 
      this.documentList = product;
      console.log(this.documentList);
    });
  }

}
