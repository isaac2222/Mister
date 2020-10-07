import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import {Restaurant} from './restaurant.model';
import { Title } from '@angular/platform-browser';
import { trigger, state, style, transition, animate} from '@angular/animations'

@Component({
  selector: 'mt-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css'],
  viewProviders: [Title],
  animations: [
    trigger('RestaurantAnimation', [
      state('ready', style({opacity: 1})),
      transition('void => ready', [
        style({opacity: 0, transform: 'translatey(-1000px'}),
        animate('500ms 0s ease-in-out')
      ])
    ])
  ]
})
export class RestaurantComponent implements OnInit {



  
  restaurantState: string;

  constructor(title: Title,  private changeDetector: ChangeDetectorRef) { 
    title.setTitle('Restaurantes')
  }

@Input() restaurant: Restaurant

  ngOnInit() {
  }

  ngAfterContentInit(){
    this.restaurantState = 'ready'
    this.changeDetector.detectChanges()
  }


}
