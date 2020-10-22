import { Component, OnInit } from '@angular/core';
import { Restaurant } from './restaurant/restaurant.model';
import { RestaurantsService } from './restaurants.service';
import { trigger, state, style, transition, animate} from '@angular/animations'
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Observable, from } from 'rxjs';
import { switchMap, tap, debounceTime, catchError, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({
        opacity: 0,
        "max-height" : "0px"
      })),
      state('visible', style({
        opacity: 1,
        "max-height" : "70px",
        "margin-top" : "20px"
      })),
      transition('* => *', animate ('250ms 0s ease-in-out'))
  ])
]
})
export class RestaurantsComponent implements OnInit {

  searchStatus = "hidden";
  restaurants: Restaurant[]

  searchForm: FormGroup
  searchControl : FormControl
  
  constructor(private restaurantsService: RestaurantsService, private fb: FormBuilder) { }

  ngOnInit() {
    this.restaurantsService.restaurants()
    .subscribe(restaurants  => this.restaurants = restaurants)

    this.searchControl = this.fb.control('')

    this.searchForm = this.fb.group({
      searchControl: this.searchControl
    });

    this.searchControl.valueChanges
    .pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(searchTerm =>
        this.restaurantsService
        .restaurants(searchTerm)
        .pipe(catchError(error => from([]))))
    ).subscribe(restaurants  => this.restaurants = restaurants);

  }

  changeSearchStatus(){
    this.searchStatus = this.searchStatus === 'hidden' ? 'visible' : 'hidden'
  }
  

}
