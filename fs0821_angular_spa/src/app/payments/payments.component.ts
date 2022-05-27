import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { ApiService } from '../api.service';
import { GridData, Payment, PaymentData } from '../grid.reducer';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  generatingSub: Subscription
  generating: boolean = false

  gridSub: Subscription
  grid: Array<string> = []

  codeSub: Subscription
  code: string = ''

  paymentsSub: Subscription
  payments: Array<Payment> = []

  paymentName: string | undefined
  paymentAmount: number | undefined

  showingPayment: Payment | undefined

  constructor(private store: Store<{gridData: GridData}>, private api: ApiService) { 

    this.generatingSub = store.select(state => state.gridData.generating).subscribe(value => this.generating = value)
    this.gridSub = store.select(state => state.gridData.grid).subscribe(value => this.grid = value)
    this.codeSub = store.select(state => state.gridData.code).subscribe(value => this.code = value)
    this.paymentsSub = store.select(state => state.gridData.payments).subscribe(value => this.payments = value)
  }

  ngOnInit(): void {
    this.api.getPayments()
  }

  onAddPayment() {

    this.api.addPayment({name: this.paymentName ?? '', amount: this.paymentAmount ?? 0, code: this.code, grid: this.grid})

    this.paymentAmount = undefined
    this.paymentName = undefined

  }

  onGridShow(payment: Payment | undefined) {
    if (payment && this.showingPayment != payment) {
      this.showingPayment = payment
    } else {
      this.showingPayment = undefined
    }
  }

  onGridHide() {
    return this.onGridShow(undefined)
  }
}
