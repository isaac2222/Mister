import { Component, OnInit, Input } from '@angular/core';
import { OrderService } from 'app/order/order.service';

@Component({
  selector: 'mt-delivery-costs',
  templateUrl: './delivery-costs.component.html'
})
export class DeliveryCostsComponent implements OnInit {

  @Input() delivery: number
  @Input() itemsValue: number

  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  total(): number {
    return this.delivery + this.itemsValue
  }

}
