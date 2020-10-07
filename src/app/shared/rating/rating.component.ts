import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {

  @Output() rated = new EventEmitter<number>()

  rates: number[] = [1,2,3,4,5]

  rate?: number = -1

  previousRate : number 
  
  constructor() { }

  ngOnInit() {
  }

  setRate(rate: number){
    this.rate = rate
    this.previousRate = undefined
    this.rated.emit(this.rate)
  }

  setTemporaryRate(r: number){
    this.previousRate = this.previousRate || this.rate

    this.rate = r
  }

  clearTemporaryRate(){
    this.rate = this.previousRate || this.rate
    this.previousRate = undefined

  }


}
