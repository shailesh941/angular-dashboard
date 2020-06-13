import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    resetToken: null;
    CurrentState: any;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService) {
        this.route.params.subscribe(params => {
          this.resetToken = params.token;
          console.log(this.resetToken);
        });
      }

  ngOnInit() {
        //this.authenticationService.logout();
        //localStorage.removeItem('currentUser');
        this.loginForm = this.formBuilder.group({
          newPassword: ['', Validators.required],
          verifyPassword: ['', Validators.required],
          token: [this.resetToken, Validators.required]
        });
        // reset login status
       // this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  // VerifyToken() {
  //   this.authenticationService.ValidPasswordToken({ resettoken: this.resetToken }).subscribe(
  //     data => {
  //       this.CurrentState = 'Verified';
  //     },
  //     err => {
  //       this.CurrentState = 'NotVerified';
  //     }
  //   );
  // }


    // convenience getter for easy access to form fields
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.authenticationService.newPassword(this.loginForm.value)
            .pipe(first())
            .subscribe(
                data => {
                    //this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.error = error;
                    this.loading = false;
                });
    }


}
