import { NgModel } from "@angular/forms";
import { NgModule } from "@angular/core";
import { OrderItemsComponent } from "./order-items/order-items.component";
import { OrderComponent } from "./order.component";
import { DeliveryCostsComponent } from "app/delivery-costs/delivery-costs.component";
import { SharedModule } from "app/shared/shared.module";
import { RouterModule, Routes } from "@angular/router";
import { LeaveOrderGuard } from "./leave-order.guard";

const ROUTES: Routes = [
    {path: '', component: OrderComponent, canDeactivate: [LeaveOrderGuard]}
]

@NgModule({
    
    declarations:[
        OrderItemsComponent,
        OrderComponent,
        DeliveryCostsComponent
    ],

    imports:[SharedModule, RouterModule.forChild(ROUTES)],
    

})

export class OrderModule {}