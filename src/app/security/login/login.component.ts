import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'app/shared/snackbar/notification.service';
import { LoginService } from './login.service';
import {User} from './user.model'

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup

  constructor(private fb: FormBuilder, private loginservice: LoginService, private notificatioService: NotificationService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [Validators.required])
    })
  }

login(){
  this.loginservice.login(this.loginForm.value.email, 
                          this.loginForm.value.password)
                   .subscribe(user => this.notificatioService.notify(`Bem vindo, ${user.name}`),
                   response => 
                          this.notificatioService.notify(response.error.message))
}

}
