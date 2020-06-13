import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})

export class SignUpComponent implements OnInit {
  submitted = false;
  form : FormGroup;
  error: any;
  constructor(private fb: FormBuilder,
    private router: Router,
    public userService:UserService,
    private authService: AuthenticationService) {
  }


  ngOnInit() {
    this.form = this.fb.group({
      firstName:[null, Validators.required],
      lastName:[null, Validators.required],
      dateDob:[null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: new FormControl(null, [Validators.required])
    },{validator: this.MustMatch('password', 'confirmPassword')});

  }

  
  get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
        return;
    }
    
    this.userService.register(this.form.value).pipe(first()).subscribe(data => {
          //console.log(data); 
        this.router.navigate(['/login']);
    },
    error => {
        this.error = error;
        //this.loading = false;
    });
    
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }






}
