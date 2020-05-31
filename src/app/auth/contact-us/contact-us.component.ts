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
    })

  }

  updateContact(proId){
    this.contactService.getSingleContact(proId).subscribe(res =>{
      console.log('Get Pro', res);
      this.contactForm.patchValue(res);
    })
    
  }

  submitForm() {
	  this.submitted = true;
    if (this.contactForm.invalid) {
        return;
    }
    if(this.contactForm.value._id){
      this.contactService.updateContact(this.contactForm.value).subscribe(res => {
        //console.log('update', res);
        if(res.success === true){
          this.router.navigate(['/user/contact-list'])
        }
      });
    }else{
      this.contactService.addContact(this.contactForm.value).subscribe(res => {
        console.log(res);
        if(res.status == 200){
          this.router.navigate(['/user/contact-list'])
        }
      });
    }

  }

  







}
