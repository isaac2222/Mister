import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { DBLINK } from '../../../../app.api'
import { User } from "./user.model";

@Injectable()
export class LoginService {

    user: User
    
    constructor(private http: HttpClient){}

    isLoggedIn(): boolean {
        return this.user !== undefined
    }

    login(email: string, password: string): Observable<User>{
        return this.http.post<User>(`${DBLINK}/login`, 
        {email: email, password: password})
        .do(user => this.user = user)
    }

}