import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { setGrid, setPayments } from './grid.actions';
import { GridData, Payment, PaymentData } from './grid.reducer';
import { environment } from './../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string

  // @Inject('baseUrl') private baseUrl: string,
  constructor( private http: HttpClient, private store: Store<{gridData: GridData,}>) { 
    this.apiURL = environment.apiURL
  }

  generate(bias: string) {
    const url = `${this.apiURL}/generate?bias=${bias}`

    this.http.get<Array<string>>(url).subscribe(data => {
      this.store.dispatch(setGrid({grid: data}))  
    })  
  }

  getPayments()  {
    const url = `${this.apiURL}/payments`

    this.http.get<Array<PaymentData>>(url, {
    }).subscribe(data => {      
      const newPaymentList = (data ?? []).map((r) => new Payment({name: r.name, amount: r.amount, code: r.code, grid: r.grid}))
      this.store.dispatch(setPayments({payments: newPaymentList}))  
    }) 
  }


  addPayment(data: PaymentData) {
    const url = `${this.apiURL}/payments`
    //if (this.generating) {
      this.http.post<Array<PaymentData>>(url, {
        name: data.name,
        amount: data.amount,
        code: data.code,
        grid: data.grid
      }).subscribe(data => {
        const newPaymentList = data.map((r) => new Payment(r))
        this.store.dispatch(setPayments({payments: newPaymentList}))  
      })      
  }

}
