import { NgModule } from '@angular/core';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [ListComponent, AddEditComponent],
  imports: [
    SharedModule,
    ProductRoutingModule,
  ],
})
export class ProductModule { }
