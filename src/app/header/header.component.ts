import { Component, OnInit } from '@angular/core';
import { LoggedInguard } from 'app/security/loggedIn.guard';
import { LoginService } from 'app/security/login/login.service';
import { User } from 'app/security/login/user.model'

@Component({
  selector: 'mt-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(private loginService: LoginService) { }

  logged() {
    return this.loginService.isLoggedIn()
  }

  user(): User {
    return this.loginService.user
  }

  ngOnInit() {
  }

}
