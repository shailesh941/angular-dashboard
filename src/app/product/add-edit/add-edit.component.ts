import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/services/user.service';
import { first } from 'rxjs/operators';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';

const URL = 'http://localhost:8080/api/upload';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css']
})
export class AddEditComponent implements OnInit {
  submitted = false;
  productForm : FormGroup;
  error: any;

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'image'
  });
  

  constructor(private fb: FormBuilder,
    private router: Router,
    public userService:UserService,
    ) { }

  ngOnInit() {
    this.productForm = this.fb.group({
      product_code:[null, Validators.required],
      product_name:[null, Validators.required],
      product_price:[null, Validators.required],
      product_dicripaton: [null],
      product_imges: [null]
    });

    this.uploader.onAfterAddingFile = (file) => {
        file.withCredentials = false;
      };
      this.uploader.onCompleteItem = (item: any, status: any) => {
        console.log('Uploaded File Details:', item);
      };

  }

  get f() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;
    
    if (this.productForm.invalid) {
        return;
    }
    
    this.userService.addProduct(this.productForm.value).subscribe(res => {
          console.log(res); 
        //this.router.navigate(['/login']);
    },
    error => {
        this.error = error;
        //this.loading = false;
    });
    
  }

  // onFileChange(event) {
  //   this.myFiles.push(event.target.files);
  //   console.log(event.target.files);
  // }



}
