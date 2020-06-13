import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {

    constructor(private router: Router, private authService : AuthenticationService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.getToken()) {
            // logged in so return true
            //this.router.navigate(['/dashboard']);
            return true;
        }

        // not logged in so redirect to login page with the return url
        //this.router.navigate(['/login']);
        return false;
    }
}