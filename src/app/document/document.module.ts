import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { AddComponent } from './add/add.component';
import { DocumentRoutingModule } from './document-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [ListComponent, AddComponent],
  imports: [
    CommonModule,
    SharedModule,
    DocumentRoutingModule
  ]
})
export class DocumentModule { }
