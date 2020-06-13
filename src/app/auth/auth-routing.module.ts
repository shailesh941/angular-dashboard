import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: 'reset-password/:token', component: ResetPasswordComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'contact-us/:id', component: ContactUsComponent },
    { path: 'contact-list', component: ContactListComponent },
    { path: '',   redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
