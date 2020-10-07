import { Injectable } from "@angular/core";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Observable } from "rxjs/Observable";
import { Order } from "./order.model";
import { DBLINK } from '../../../app.api';
import { HttpClient } from "@angular/common/http";


@Injectable()
export class OrderService {
  constructor ( private cartService: ShoppingCartService , private http: HttpClient){
  }

  cartItems(): CartItem[] {
    return this.cartService.items
  }

  increaseQtd(item: CartItem){
    this.cartService.increaseQtd(item)
  }
  decreaseQtd(item: CartItem){
    this.cartService.decreaseQtd(item)
  }

  remove(item : CartItem){
    this.cartService.removeItem(item)
  }

  itemsValue(): number {
    return this.cartService.total()
  }

  checkOrder(order: Order): Observable<string> {

    return this.http.post<Order>(`${DBLINK}/orders`, order)
                .map(order => order.id)
  }

  clear(){
    this.cartService.clear()
  }

}