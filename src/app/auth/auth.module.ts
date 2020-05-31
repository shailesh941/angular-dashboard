import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthRoutingModule } from './auth-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../shared/services/auth.guard';
import { SharedModule } from '../shared/shared.module';
import { AuthenticationService } from '../shared/services/authentication.service';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContactListComponent } from './contact-list/contact-list.component';



@NgModule({
  declarations: [LoginComponent, SignUpComponent, ContactUsComponent, ContactListComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [AuthenticationService,AuthGuard]
})
export class AuthModule { }
