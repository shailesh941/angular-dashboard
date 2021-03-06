import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  
  forgetForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  snedMail:any;

constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {

    }

ngOnInit() {
      //this.authenticationService.logout();
      //localStorage.removeItem('currentUser');
      this.forgetForm = this.formBuilder.group({
        email: ['', Validators.required]
      });
      // reset login status
     // this.authenticationService.logout();
      // get return url from route parameters or default to '/'
      //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
}

  // convenience getter for easy access to form fields
  get f() { return this.forgetForm.controls; }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.forgetForm.invalid) {
          return;
      }
      this.loading = true;
      this.authenticationService.requestReset(this.forgetForm.value)
          .pipe(first())
          .subscribe(
              data => {
                  console.log(data);
                  this.snedMail = "Send Reset Passwors link your mail id"
                  //this.router.navigate([this.returnUrl]);
                  this.loading = false;
                  this.forgetForm.reset();
              },
              error => {
                  this.error = error;
                  this.loading = false;
                  this.forgetForm.reset();
              });
  }

}
