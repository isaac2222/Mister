import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from './shopping-cart.service';
import { MenuItem } from '../menu-item/menu-item.model';
import { trigger,state, transition, animate, keyframes,style } from '@angular/animations';

@Component({
  selector: 'mt-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  animations: [trigger('keyAnimation', [
    state('ready', style({opacity: 1})),
    transition('void => ready', animate('500ms 0s ease-in', keyframes([
      style({opacity: 0, transform: 'translateX(-30px)', offset: 0}),
      style({opacity: 0.5, transform: 'translateX(60px)', offset: 0.5}),
      style({opacity: 1, transform: 'translateX(0px)', offset: 1}),
    ]))),
    transition('ready => void', animate('500ms 0s ease-out', keyframes([
      style({opacity: 1, transform: 'translateX(0px)', offset: 0}),
      style({opacity: 0.5, transform: 'translateX(60px)', offset: 0.5}),
      style({opacity: 0, transform: 'translateX(-30px)', offset: 1}),
    ])))

  ])]
})
export class ShoppingCartComponent implements OnInit {

  rowState = 'ready'

  constructor(private shoppingCartService: ShoppingCartService) { }

  ngOnInit() {
  }

  items(): any[]{
    return this.shoppingCartService.items
  }

  total(): number {
    return this.shoppingCartService.total()
  }

  clear(){
    this.shoppingCartService.clear()
  }

  removeItem(item : any){
    this.shoppingCartService.removeItem(item)
  }

  addItem (item: MenuItem){
    this.shoppingCartService.addItem(item)
  }
}
