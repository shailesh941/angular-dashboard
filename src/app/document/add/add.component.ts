import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentService } from 'src/app/shared/services/document.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  form: FormGroup;
  error: any;
  preview: string;
  percentDone: any = 0;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public documentService:DocumentService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {

    this.form = this.fb.group({
      name: [''],
      price: [''],
      avatar: [null]
    })

  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({
      avatar: file
    });
    this.form.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  submitForm() {
    let formdata = this.form.value

    this.documentService.addDocument(formdata,
      this.form.value.avatar
    ).subscribe((event: HttpEvent<any>) => {
      console.log(event);
      switch (event.type) {
        case HttpEventType.Sent:
          console.log('Request has been made!');
          break;
        case HttpEventType.ResponseHeader:
          console.log('Response header has been received!');
          break;
        case HttpEventType.UploadProgress:
          this.percentDone = Math.round(event.loaded / event.total * 100);
          console.log(`Uploaded! ${this.percentDone}%`);
          break;
        case HttpEventType.Response:
          console.log('User successfully created!', event.body);
          //this.percentDone = false;
          this.router.navigate(['document/list'])
      }
    })
  }








}
