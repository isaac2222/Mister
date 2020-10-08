import { Injectable } from "@angular/core";
import { CanLoad, Route } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class LoggedInguard implements CanLoad {
    canLoad(route: Route): boolean {
        console.log(route)
        return false
    }

}