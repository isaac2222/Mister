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

  user: User
  constructor(private loginService: LoginService) { }

  logged() {
    const loggedIn = this.loginService.isLoggedIn()
    return loggedIn
  }

  ngOnInit() {
  }

}
