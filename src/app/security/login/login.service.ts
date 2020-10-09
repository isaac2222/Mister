import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

import { DBLINK } from '../../../../app.api'
import { User } from "./user.model";

@Injectable()
export class LoginService {

    user: User
    
    constructor(private http: HttpClient, private router: Router){}

    isLoggedIn(): boolean {
        return this.user !== undefined
    }

    login(email: string, password: string): Observable<User>{
        return this.http.post<User>(`${DBLINK}/login`, 
        {email: email, password: password})
        .do(user => this.user = user)
    }

    handleLogin(path?: string){
       this.router.navigate(['/login',btoa(path)])     
    }

}