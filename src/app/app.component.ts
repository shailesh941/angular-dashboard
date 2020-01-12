import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationEnd  } from '@angular/router';
import { AuthService } from './service/authservice';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-dashboard';
  showHead: boolean = false;

  constructor(private route:ActivatedRoute, router: Router, private zone: NgZone, private auth: AuthService) {
   
   router.events.subscribe((event: any) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login' || event['url'] == '/sign-up') {
          this.showHead= true;
        } else {
          this.showHead= false;
        }
      }
    });

  }

  ngOnInit() {
    console.log('Local', this.auth.getToken())
  }
  


}
