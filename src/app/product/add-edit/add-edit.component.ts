import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { ProductService } from 'src/app/shared/services/product.service';
import { DocumentService } from 'src/app/shared/services/document.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  submitted = false;
  productForm : FormGroup;
  form: FormGroup;
  error: any;
  preview: string;
  percentDone: any = 0;

  constructor(private fb: FormBuilder,
    private router: Router,
    public productService:ProductService,
    public documentService:DocumentService,
    private cd: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      product_code:[null, Validators.required],
      product_name:[null, Validators.required],
      product_price:[null, Validators.required],
      product_dicripaton: [null],
      product_imges: [null]
    });

    this.form = this.fb.group({
      name: [''],
      price: [''],
      avatar: [null]
    })


  }

  get f() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;
    
    if (this.productForm.invalid) {
        return;
    }

    this.productService.addProduct(this.productForm.value).subscribe(res => {
      console.log(res);
    },
    error => {
        this.error = error;
        //this.loading = false;
    });
    
    // this.productService.addProduct(this.productForm.value).subscribe((event: HttpEvent<any>) => {
    //   switch (event.type) {
    //     case HttpEventType.Sent:
    //       console.log('Request has been made!');
    //       break;
    //     case HttpEventType.ResponseHeader:
    //       console.log('Response header has been received!');
    //       break;
    //     case HttpEventType.UploadProgress:
    //       this.percentDone = Math.round(event.loaded / event.total * 100);
    //       console.log(`Uploaded! ${this.percentDone}%`);
    //       break;
    //     case HttpEventType.Response:
    //       console.log('User successfully created!', event.body);
    //       //this.percentDone = false;
    //       this.router.navigate(['users-list'])
    //   }
    // },
    // error => {
    //     this.error = error;
    //     //this.loading = false;
    // });
    
  }

  onFileChange(event) {
    const reader = new FileReader();
 
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.productForm.patchValue({
          product_imges: reader.result
       });
      
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
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

    this.documentService.addUser(formdata,
      this.form.value.avatar
    ).subscribe((event: HttpEvent<any>) => {
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
          this.percentDone = false;
          //this.router.navigate(['users-list'])
      }
    })
  }






}
