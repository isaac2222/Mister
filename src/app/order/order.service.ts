import { Injectable } from "@angular/core";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { CartItem } from "app/restaurant-detail/shopping-cart/cart-item.model";
import { Observable } from "rxjs/Observable";
import { Order } from "./order.model";
import { DBLINK } from '../../../app.api';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoginService } from "app/security/login/login.service";



@Injectable()
export class OrderService {
  constructor ( private cartService: ShoppingCartService , 
                private http: HttpClient,
                private loginServie: LoginService){
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
    let headers = new HttpHeaders()
    if(this.loginServie.isLoggedIn()){
      headers = headers.set('Authorization', `Bearer ${this.loginServie.user.accessToken}`)
    }
    return this.http.post<Order>(`${DBLINK}/orders`, order, {headers: headers})
                .map(order => order.id)
  }

  clear(){
    this.cartService.clear()
  }

}