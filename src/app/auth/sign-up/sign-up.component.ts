import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  form : FormGroup;
  constructor(private fb: FormBuilder,
    private myRoute: Router,
    private auth: AuthenticationService) {
    this.form = fb.group({
      email: ['test@test.com', [Validators.required, Validators.email]],
      password: ['123456', Validators.required]
    });
  }
  ngOnInit() {
  }

  // onSubmit() {
  //   if (this.form.valid) {
  //     this.auth.sendToken(this.form.value.email)
  //     this.myRoute.navigate(["dashboard"]);
  //   }
  // }
}
