import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './shared/services/auth.guard';


const routes: Routes = [
  { path: 'login', component:  LoginComponent},
  { path: 'sign-up', component:  SignUpComponent},
  { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: 
  [AuthGuard]},
  { path: '',   redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
