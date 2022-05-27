//
// based on
// https://www.foolishdeveloper.com/2021/07/simple-analog-clock-html-css-javascript.html
//
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-clock',
  templateUrl: './clock.component.html',
  styleUrls: ['./clock.component.css']
})
export class ClockComponent implements OnInit {

  date: Date = new Date()
  constructor() { 
    setInterval(()=> this.date = new Date(), 1000)
  }

  ngOnInit(): void {
  }


  rotateSeconds(): string {
    const seconds = this.date.getSeconds()
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    return `rotate(${secondsDegrees}deg)`
  }

  rotateMinutes() : string {
    const seconds = this.date.getSeconds()
    const mins = this.date.getMinutes()
    const minsDegrees = ((mins / 60) * 360) + (( seconds / 60 ) * 6) + 90;
    return `rotate(${minsDegrees}deg)`
  }

  rotateHours(): string {
    const mins = this.date.getMinutes()
    const hour = this.date.getHours();
    const hourDegrees = ((hour / 12) * 360) + (( mins / 60 ) * 30) + 90;
    return `rotate(${hourDegrees}deg)`;  
  }

}
