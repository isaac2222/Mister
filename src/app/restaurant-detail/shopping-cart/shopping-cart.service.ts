import { CartItem } from "./cart-item.model"
import { MenuItem } from "../menu-item/menu-item.model"
import { NotificationService } from "app/shared/snackbar/notification.service"
import { Injectable } from "@angular/core"


@Injectable()
export class ShoppingCartService {

constructor (private notificationsService: NotificationService){}


  items: CartItem[] = []

  clear(){
    this.items = []
  }

  total(): number{
    return this.items
    .map(item => item.value())
    .reduce((prev, value) => prev + value, 0)
  }

  addItem(item:MenuItem){
    let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)
    foundItem ? this.increaseQtd(foundItem): this.items.push(new CartItem(item))
    this.notificationsService.notify(`Você adicionou o item ${item.name} ao carrinho.`)
  }

  removeItem(item:CartItem){
    this.items.splice(this.items.indexOf(item), 1)
    this.notificationsService.notify(`Você removeu o item ${item.menuItem.name} ao carrinho.`)
  }

  increaseQtd(item: CartItem){
    item.quantity = item.quantity + 1
  }
  decreaseQtd(item: CartItem){
    item.quantity = item.quantity - 1

    if (item.quantity == 0) 
    this.removeItem(item)
  }
}