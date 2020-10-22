import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, style, animate } from '@angular/animations';
import { NotificationService } from './notification.service';
import { Observable, timer } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators'



@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('animation1', [
      state('visible', style({
        opacity: 1,
        bottom: '30px',
      })),
      state('hidden', style({
        opacity: 0,
        bottom: '0px',
      })),
      transition('* => *', animate('500ms 0s ease-in'))
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  constructor(private notificationService: NotificationService) { }

  message = 'Hello'

  snackVisibility = 'hidden'

  // snackVisibility = {true: 'visible', false: 'hidden'}
  // snackState : boolean = false

  // toggleButton(){
  //   this.snackState = !this.snackState
  // }

  ngOnInit() {
    this.notificationService.notifier.pipe(tap(message => {
      this.message = message,
        this.snackVisibility = 'visible'
    }),
      switchMap(message => timer(3000))
    )
      .subscribe(timer => this.snackVisibility = 'hidden')
  }

}
