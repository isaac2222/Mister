import { Component, OnInit } from '@angular/core';
import { RadioOption } from 'app/shared/radio/radio-option.model';
import { OrderService } from './order.service';
import { CartItem } from 'app/restaurant-detail/shopping-cart/cart-item.model';
import { Order, OrderItem } from './order.model';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { User } from 'app/security/login/user.model';
import { LoginService } from 'app/security/login/login.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'

})
export class OrderComponent implements OnInit {

  orderForm: FormGroup

  delivery: number = 2;

  emailPattern = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

  numberPattern = /^[0-9]*$/
  orderId : string;

  paymentOptions: RadioOption[] = [
    { label: 'Dinheiro', value: 'MON' },
    { label: 'Cartão de débito', value: 'DEB' },
    { label: 'Cartão Refeição', value: 'REF' }

  ]

  constructor(private orderService: OrderService,
    private router: Router,
    private formBuilder: FormBuilder,
    private loginService: LoginService) { }

  ngOnInit() {
    this.orderForm = new FormGroup({
      name: new FormControl('', {
      validators:[Validators.required, Validators.minLength(2)]
      }),
      email: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: this.formBuilder.control('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      number: this.formBuilder.control('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: this.formBuilder.control(''),
      paymentOption: this.formBuilder.control('', [Validators.required])
    }, { validators: [OrderComponent.equalsTo], updateOn: 'blur' })
  }

  static equalsTo(group: AbstractControl): { [key: string]: boolean } {
    const email = group.get('email')
    const emailConfirmation = group.get('emailConfirmation')
    if (!email || !emailConfirmation)
      return undefined

    if (email.value !== emailConfirmation.value) {
      return { emailsNotMatch: true }
    }
    return undefined
  }

  itemsValue(): number {
    return this.orderService.itemsValue()
  }

  cartItems(): CartItem[] {
    return this.orderService.cartItems()
  }

  increaseQtd(item: CartItem) {
    this.orderService.increaseQtd(item)
  }

  decreaseQtd(item: CartItem) {
    this.orderService.decreaseQtd(item)
  }

  remove(item: CartItem) {
    this.orderService.remove(item)
  }

  checkOrder(order: Order) {
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))

    this.orderService.checkOrder(order)
    .pipe(tap((orderId: string)=> {
      this.orderId = orderId}))
     
      .subscribe((orderId: string) => {
        this.router.navigate(['/order-sumary'])
        console.log(`Compra concluída ${orderId}`)
        this.orderService.clear()
      })
    console.log(order)
  }

  user() : User{
    return this.loginService.user
  }

  isOrderCompleted():boolean{
    return this.orderId !== undefined
  }

}
