import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactUsService } from 'src/app/shared/services/contactus.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  submitted:boolean = false;
  productId: any;
  error: any;
  preview: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private contactService:ContactUsService,
  ) { }

  ngOnInit() {

    this.activeRoute.params.subscribe(params => {
      if(params['id']) {
          console.log(params.id);
          this.productId = params.id;
          this.updateContact(params.id)
      }
    })

    this.contactForm = this.fb.group({
      _id:[null],
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      address: [''],
      state: [''],
      city: [''],
      pinno: [''],
      avatar: [null]
    })

  }

  updateContact(proId){
    this.contactService.getSingleContact(proId).subscribe(res =>{
      console.log('Get Pro', res);
      this.contactForm.patchValue(res);
      this.preview = this.contactForm.get('avatar').value;
    })
    
  }

  submitForm() {
	  this.submitted = true;
    if (this.contactForm.invalid) {
        return;
    }
    let formData = this.contactForm.value;

    if(this.contactForm.value._id){
      this.contactService.updateContact(formData, this.contactForm.value.avatar).subscribe(res => {
        //console.log('update', res);
        if(res.success === true){
          this.router.navigate(['/user/contact-list'])
        }
      });
    }else{
      this.contactService.addContact(formData, this.contactForm.value.avatar).subscribe(res => {
        console.log(res);
        if(res.status == 200){
          this.router.navigate(['/user/contact-list'])
        }
      });
    }

  }

  uploadFile(event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.contactForm.patchValue({
      avatar: file
    });
    this.contactForm.get('avatar').updateValueAndValidity()

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.preview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  







}
