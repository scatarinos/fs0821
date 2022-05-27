import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { setBias, toggleGenerating } from '../grid.actions';
import { GridData } from '../grid.reducer';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {
  generating$: Observable<boolean>;
  grid$: Observable<Array<string>>;
  code$: Observable<string>

  bias: string = 'a'
  biasEnabled: boolean = true

  subscribeBias: Subscription

  constructor(private store: Store<{gridData: GridData}>) { 

    this.grid$ = this.store.select(state => state.gridData.grid)
    this.code$ = store.select(state => state.gridData.code)
    this.generating$ = store.select(state => state.gridData.generating)

    this.subscribeBias = this.store.select(state => state.gridData.bias).subscribe(value => {
      this.bias = value;
    })
  }

  ngOnInit(): void {

  }

  onToggleGenerator() {
    this.store.dispatch(toggleGenerating())
  }


  onChangeBias($event: KeyboardEvent) {
    if ($event.key.match(/^[a-z]$/)) {
      this.store.dispatch(setBias({ bias: $event.key }))  
    } else {
      this.bias = ''
      this.store.dispatch(setBias({ bias: '' }))  
    }

    // disabling for 4secs
    if (this.bias.length > 0) {
      this.biasEnabled = false
      setTimeout(() => this.biasEnabled = true, 4000)  
    }
  }

}
