import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ProductModule } from './product/product.module';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './shared/services/auth.guard';


const routes: Routes = [
  { path: 'user',
    loadChildren: './auth/auth.module#AuthModule'
  },
  { path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
    canActivate:[AuthGuard]
  },
  { path: 'product', 
    loadChildren: './product/product.module#ProductModule', 
    canActivate:[AuthGuard]
  },
  { path: 'document', 
    loadChildren: './document/document.module#DocumentModule', 
    canActivate:[AuthGuard]
  },
  //{ path: '',   redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
