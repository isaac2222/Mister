import { Injectable } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { DBLINK } from '../../../app.api';
import { Observable } from 'rxjs';
import {ErrorHandler} from '../app.error-handler';
import { MenuItem } from 'app/restaurant-detail/menu-item/menu-item.model';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable()
export class RestaurantsService {



  constructor(private http: HttpClient ) { }

  restaurants(search?: string): Observable<Restaurant[]>{
    let params: HttpParams = undefined
    if(search){
      params = new HttpParams().append('q', search)
    }
    return this.http.get<Restaurant[]>(`${DBLINK}/restaurants`, {params: params})
  }

  restaurantById(id: string): Observable<Restaurant>{
    return this.http.get<Restaurant>(`${DBLINK}/restaurants/${id}`)
  }

reviewsOfRestaurant (id: string): Observable<any>{
  return this.http.get(`${DBLINK}/restaurants/${id}/reviews`)
}

menuOfRestaurant (id: string): Observable<MenuItem[]> {
  return this.http.get<MenuItem[]>(`${DBLINK}/restaurants/${id}/menu`)
  
}



}
