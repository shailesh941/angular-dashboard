import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd  } from '@angular/router';
import { AuthenticationService } from './shared/services/authentication.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-dashboard';
  showHead: boolean = false;
  userData:any;
  resetToken: any;

  constructor(
    private route:ActivatedRoute, 
    private router: Router, 
    private zone: NgZone, 
    private auth: AuthenticationService){



  }

  ngOnInit() {
    if(this.auth.getToken() != null){
      this.route.snapshot.queryParams['dashboard'] || '/dashboard';
      //this.router.navigate(['/dashboard']);
      this.showHead= true
    }else{
      this.showHead= false;
    }
    this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          console.log(event['url'])
          let restPass = event['url'];
         let newurl = restPass.split('/')
         let getUrl = newurl[1];
         console.log('new url', newurl[1])
          if (event['url'] == '/login' || event['url'] == '/sign-up' || event['url'] == '/forgot-password' || getUrl == 'reset-password') {
            this.showHead= true;
          } else {
            this.showHead= false;
          }
        }
      });
    
    console.log('Local', this.auth.getToken())
    console.log('Show Head', this.showHead)

  }
  


}
