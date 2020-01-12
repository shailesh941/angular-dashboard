import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/authservice';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form : FormGroup;
  constructor(private fb: FormBuilder,
    private myRoute: Router,
    private auth: AuthService) {
    this.form = fb.group({
      email: ['test@test.com', [Validators.required, Validators.email]],
      password: ['12345', Validators.required]
    });
  }
  ngOnInit() {
  }

  onSubmit() {
    if (this.form.valid) {
      this.auth.sendToken(this.form.value.email)
      console.log();
      this.myRoute.navigate(["dashboard"]);
    }
  }

}
