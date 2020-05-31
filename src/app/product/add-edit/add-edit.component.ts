import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
  error: any;
  preview: string;
  percentDone: any = 0;
  productId:any = null;

  constructor(private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public productService:ProductService,
    public documentService:DocumentService,
    private cd: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(params => {
      if(params['id']) {
          console.log(params.id);
          this.productId = params.id;
          this.updateProduct(params.id)
      }
    })


    this.productForm = this.fb.group({
      product_code:[null, Validators.required],
      product_name:[null, Validators.required],
      product_price:[null, Validators.required],
      product_dicripaton: [null],
      product_imges: [null]
    });


  }

  get f() { return this.productForm.controls; }

  
  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.productForm.patchValue({
      product_imges: file
    });
    this.productForm.get('product_imges').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  updateProduct(proId){
    //this.productForm.patchValue()
    this.productService.getSingleProduct(proId).subscribe(res =>{
      console.log('Get Pro', res);
      this.productForm.patchValue(res);
      this.preview = this.productForm.value.product_imges;
      //console.log(this.productForm.value.product_imges)
    })
    
  }
  

  submitForm() {
	  this.submitted = true;

    if (this.productForm.invalid) {
        return;
    }
    if(this.productId != null){
      console.log(this.productId);
      let formdata = this.productForm.value
      this.productService.updateProduct(this.productId, formdata).subscribe(res => {
        console.log(res);
      })
    }else{
      let formdata = this.productForm.value
      this.productService.addProduct(formdata, this.productForm.value.product_imges).subscribe((event: HttpEvent<any>) => {
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
            this.router.navigate(['product/list'])
        }
      })
    }
    

    


  }






}
