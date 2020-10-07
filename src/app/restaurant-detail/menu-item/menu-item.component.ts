import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MenuItem } from "./menu-item.model"
import { trigger, state, style, transition, animate } from '@angular/animations';


@Component({
  selector: 'mt-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
  animations: [trigger('menuAnimation', [
    state('open', style({ opacity: 1 })),
    transition('void => open', [
      style({ opacity: 0, transform: 'translateY(-20px' }),
      animate('15000ms 0 ease-in')
    ])
  ])
]
})
export class MenuItemComponent implements OnInit {

  menuState = 'ready';

  @Input() menuItem: MenuItem
  @Output() add = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  emitAddEvent() {
    this.add.emit(this.menuItem)
  }

}
