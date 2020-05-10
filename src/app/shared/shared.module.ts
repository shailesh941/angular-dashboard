import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './services/auth.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './services/error.interceptor';
import { BasicAuthInterceptor } from './services/basic-auth.interceptor';
import {FileUploadModule} from 'ng2-file-upload';
import { FileUploadComponent } from './component/file-upload/file-upload.component';

@NgModule({
  declarations: [FileUploadComponent],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports:[
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    FileUploadModule,
    FileUploadComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ]
})
export class SharedModule { }
