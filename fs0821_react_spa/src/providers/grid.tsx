import React, { ReactNode } from "react";
import { GridData, initialState, Payment, PaymentData, reducer } from "./grid.reducer";

interface IGridContext {
    state: GridData,
    toggleGenerating?: Function,
    generate?: Function,
    setBias?: Function,
    addPayment?: Function,
    getPayments?: Function,
  }

  
export const GridContext = React.createContext<IGridContext>({state: initialState });
export const GridProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  
  const apiURL = process.env.REACT_APP_API_URL ?? 'NO_API'
  const value = {
    state,

    toggleGenerating() {
        dispatch({type: 'TOGGLE_GENERATING', payload: { }})
    },

    setBias(bias: string) {
        dispatch({type: 'SET_BIAS', payload: { bias }})
    },

    async generate() {
        const url = `${apiURL}/generate?bias=${state.bias}`
        const response = await fetch(url, { method: 'GET'})
        const data = await response.json()
        dispatch({type: 'SET_GRID', payload: { grid: data }})          
    },

    async addPayment(data: PaymentData) {

        const url = `${apiURL}/payments`
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data)
        })
        const result = await response.json()
        const newPaymentList = (result ?? []).map((r: any) => new Payment({name: r.name, amount: r.amount, code: r.code, grid: r.grid}))
        dispatch({type: 'GET_PAYMENTS', payload: {payments: newPaymentList}})          
    },

    async getPayments() {
        const url = `${apiURL}/payments`
        const response = await fetch(url, { method: 'GET'})
        const data = await response.json()
        const newPaymentList = (data ?? []).map((r: any) => new Payment({name: r.name, amount: r.amount, code: r.code, grid: r.grid}))
        dispatch({type: 'GET_PAYMENTS', payload: {payments: newPaymentList}})
    },

  }

  return (
    <GridContext.Provider value={value}>
      {children}
    </GridContext.Provider>
  )
}
