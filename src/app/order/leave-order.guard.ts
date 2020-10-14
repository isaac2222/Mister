import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { OrderComponent } from "./order.component";

export class LeaveOrder implements CanDeactivate<OrderComponent> {

    canDeactivate(
        orderComponent: OrderComponent,
        activatedRoute: ActivatedRouteSnapshot,
        routerState: RouterStateSnapshot): boolean {
        if (!orderComponent.isOrderCompleted()) {
            return window.confirm('Têm certeza que deseja sair da página?')
        } else {
            return true
        }
    }

}