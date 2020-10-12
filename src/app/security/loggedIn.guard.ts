import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import { LoginService } from './login/login.service';

@Injectable()
export class LoggedInguard implements CanLoad, CanActivate {

    constructor(private loginService: LoginService) { }

    checkAuthentication(path: string): boolean {
        const loggedIn = this.loginService.isLoggedIn()
        if (!loggedIn) {
            this.loginService.handleLogin(`/${path}`)
        }
        return loggedIn
    }

    canLoad(route: Route): boolean {
        return this.checkAuthentication(route.path)
    }

    canActivate(activateRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        return this.checkAuthentication(activateRoute.routeConfig.path)
    }

}
