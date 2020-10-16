import { NgModule, ModuleWithProviders } from "@angular/core";
import { InputComponent } from "./input/input.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { ShoppingCartService } from "app/restaurant-detail/shopping-cart/shopping-cart.service";
import { OrderService } from "app/order/order.service";
import { RestaurantsService } from "app/restaurants/restaurants.service";
import { SnackbarComponent } from './snackbar/snackbar.component';
import { NotificationService } from "./snackbar/notification.service";
import { LoginService } from "app/security/login/login.service";
import { LoggedInguard } from "app/security/loggedIn.guard";
import { LeaveOrderGuard } from "app/order/leave-order.guard";
import { AuthInterceptor } from "app/security/auth.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

@NgModule({

    declarations: [InputComponent,
        RadioComponent,
        RatingComponent,
        SnackbarComponent],

    imports: [
        FormsModule,
        CommonModule,
        ReactiveFormsModule
    ],

    exports:[
        InputComponent,
        RadioComponent,
        RatingComponent,
        FormsModule,
        CommonModule,
        SnackbarComponent,
        ReactiveFormsModule
    ]
})

export class SharedModule { 
    static forRoot() : ModuleWithProviders{
        return {
            ngModule: SharedModule,

            providers:[
                NotificationService,
                ShoppingCartService, 
                LoggedInguard,
                OrderService,
                LeaveOrderGuard,
                LoginService,
                {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
                RestaurantsService,
                
            ]
        }
    }
}
