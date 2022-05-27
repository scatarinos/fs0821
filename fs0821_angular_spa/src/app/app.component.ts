import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { GridData } from './grid.reducer';
import { setGrid } from './grid.actions';
import { Router, ActivatedRoute, ParamMap, NavigationEnd } from '@angular/router';
import { ApiService } from './api.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
@Injectable()
export class AppComponent {
  title: string = 'angular-0821';

  currentUrl: string = ''
  subscribeGenerating: Subscription
  subscribeBias: Subscription
  generating: boolean = false


  bias: string = ''  


  intervalHandler: NodeJS.Timeout | undefined;

  date = new Date()

  constructor(private router: Router, private store: Store<{gridData: GridData,}>, private api: ApiService) { 
    this.subscribeGenerating = this.store.select(state => state.gridData.generating).subscribe(value => this.generating = value)
    this.subscribeBias = this.store.select(state => state.gridData.bias).subscribe(value => this.bias = value)

    this.startInterval()

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url
      }
    });

  }

  startInterval() {
    clearInterval(this.intervalHandler)
    this.intervalHandler = setInterval(() => {
      this.date = new Date()
      this.generate()
    },  2000)
  }


  generate() {
    if (this.generating) {
      this.api.generate(this.bias)
    }
  }

  ngOnInit() {    
  }

  ngOnDestroy() {
    this.subscribeGenerating.unsubscribe();
    this.subscribeBias.unsubscribe();
  }

}
