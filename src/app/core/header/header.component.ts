import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { UserService } from 'src/app/shared/services/user.service';
import { first } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userDetails:any;
  userData:any;
  constructor(public auth: AuthenticationService, private userService: UserService) { }

  ngOnInit() {
    
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser != null && currentUser.token){
      let decoded = jwt_decode(currentUser.token);
      this.userData = decoded;
      console.log(this.userData)
      this.getUserData();
    }
    

  }
  logout(){
    this.auth.logout();
  }
  getUserData(){
      this.userService.getById(this.userData.userId).pipe(first()).subscribe(users => { 
        this.userDetails = users;
    });
  }


}
