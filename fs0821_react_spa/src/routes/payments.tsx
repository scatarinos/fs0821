import React from 'react';
import { useState, useEffect } from 'react'
import { GridContext } from '../providers/grid';
import { Payment } from '../providers/grid.reducer';

export default function Payments() {
    const [initialLoad, setInitialLoad] = useState(false)
    const [name, setName] = useState<string>('')
    const [amount, setAmount] = useState<number | undefined>(undefined)

    const { state : { payments, code, grid, generating }, addPayment , getPayments} = React.useContext(GridContext);

    const [showingPayment, setShowingPayment] = useState<Payment | undefined>(undefined)


    function onGridShow(payment: Payment) {
        setShowingPayment(payment)
    }
    function onGridHide() {
        setShowingPayment(undefined)
    }
    async function onAddPayment()  {
        if (addPayment != null) {
            addPayment({name, amount, code, grid})
        }
        setAmount(0)
        setName('')
    }

    useEffect(()  => {
        if(getPayments && !initialLoad) {
            setInitialLoad(true)
            getPayments()
        }
    }, [getPayments, initialLoad])

    return (
        <>
        <div className="container mx-auto py-4">
            <div className="flex flex-row justify-center">
                <div className="w-fit justify-center font-bold text-sm" >
                    <div className={`w-2 h-2 inline-block rounded-lg ${generating ? 'bg-green-500' : 'bg-red-200'}`} ></div>
                    <div className="p-2 inline-block">LIVE </div>
                </div>
            </div>
            <div className="p-2" ></div>
            <div className="flex flex-row justify-center">
                <div className="border-2 p-4 px-16 w-fit justify-center text-sm h-14" >YOUR CODE NOW: <span className="font-bold">{ code }</span></div>
            </div>  
        </div>

        <div className="p-4" ></div>
        <form onSubmit={e => { e.preventDefault(); }}>
            <div className="flex flex-row items-end">
                <div>
                    <label htmlFor="bias" className="block text-xs uppercase font-bold opacity-50 py-2">payment</label>
                    <input name="name" value={name} onChange={(event) => setName(event.target.value)} className="form-control border p-2 w-36 h-8" placeholder="Payment" />    
                </div>
                <div className="p-2"></div>
                <div>
                    <label htmlFor="amount" className="block text-xs uppercase font-bold opacity-50 py-2">amount</label>
                    <input type="number" name="amount" value={amount} onChange={(event) => setAmount(parseFloat(event.target.value))} className="form-control border p-2 w-36 h-8" placeholder="Amount" />    
                </div>
                <div className="p-2"></div>
                <button className="border p-0 px-2 text-xs bg-slate-500 text-white font-bold h-8 rounded-md uppercase disabled:bg-gray-400" disabled={!generating || !name || !amount}   onClick={onAddPayment}>
                    + Add
                </button>
            
            </div>
        </form>

        <div className="p-2"></div>    
        <div className="text-xs uppercase font-bold opacity-50 py-2">payment list</div>
        <div className="container mx-auto">


            {/*  <!-- show grid Modal--> 
            [ngClass]="showingPayment ? 'w-full' : 'opacity-0 w-0 h-auto'"
            */}
            <div className={`modal pointer-events-auto fixed w-0 h-full top-0 left-0 flex items-center justify-center text-center ${showingPayment ? 'w-full' : 'opacity-0 w-0 h-auto'}`} >
                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                
                <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
                
                <div className="modal-content py-4 text-left px-6">
                    <div className="flex justify-between items-center pb-3">
                    <p className="text-2xl font-bold">Grid</p>
                    <div className="modal-close cursor-pointer z-50" onClick={onGridHide} >
                        <svg className="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                        <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                        </svg>
                    </div>
                    </div>
                    
                    <div className="grid grid-cols-10 bg-slate-300">
                        {showingPayment?.grid.map((cell, index) => (
                            <div className="border text-center p-2 whitespace-pre" key={index}>
                                { cell }
                            </div>  
                        ))}
                    </div>
                

                    <div className="flex justify-end pt-2">
                    <button className="modal-close px-4 bg-gray-500 p-1 rounded-md text-white hover:bg-gray-400 h-8" onClick={onGridHide}>Close</button>
                    </div>
                    
                </div>
                </div>
            </div>

            <ul className="flex flex-col w-full">
                <li className="flex flex-row justify-between">
                    <div className="w-2/3 uppercase text-sm border p-2"><span className="text-gray-400">name</span></div>
                    <div className="w-1/6 uppercase text-sm border p-2 text-center"><span className="text-gray-400">amount</span></div>
                    <div className="w-1/6 uppercase text-sm border p-2 text-center"><span className="text-gray-400">code</span></div>
                    <div className="w-1/6 uppercase text-sm border p-2 text-center"><span className="text-gray-400">grid</span></div>
                </li>
                {payments.map((payment, index) => (
                    <li className="flex flex-row justify-between" key={index}>
                        <div className="w-2/3 uppercase text-sm border p-2">{ payment.name }</div>
                        <div className="w-1/6 uppercase text-sm border p-2 text-center">{ payment.amount }</div>
                        <div className="w-1/6 uppercase text-sm border p-2 text-center">{ payment.code }</div>
                        <div className="w-1/6 uppercase text-sm border p-2 text-center cursor-help" onClick={() => onGridShow(payment)}>
                            { payment.grid.length }
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                            </svg>                            
                        </div>
                    </li>
                
                ))}
            </ul>

        </div>

    </>
    );
  }



  /*
<div class="container mx-auto">
    <div class="flex flex-row justify-center">
        <div class="w-fit justify-center font-bold text-sm" >
          <div class="w-2 h-2 inline-block rounded-lg" [ngClass]="generating ? 'bg-green-500' : 'bg-red-200'"></div>
          <div class="p-2 inline-block">LIVE </div>
        </div>
      </div>
      <div class="p-2" ></div>
      <div class="flex flex-row justify-center">
        <div class="border-2 p-4 px-16 w-fit justify-center text-sm h-14" >YOUR CODE NOW: <span class="font-bold">{{ code }}</span></div>
      </div>  

      <div class="p-4" ></div>
      <form>
          <div class="flex flex-row items-end">
            <div>
                <label for="bias" class="block text-xs uppercase font-bold opacity-50 py-2">payment</label>
                <input name="paymentName" class="form-control border p-2 w-36 h-8" placeholder="Payment" [(ngModel)]="paymentName">    
            </div>
            <div class="p-2"></div>
            <div>
                <label for="paymentAmount" class="block text-xs uppercase font-bold opacity-50 py-2">amount</label>
                <input type="number" name="paymentAmount" class="form-control border p-2 w-36 h-8" placeholder="Amount" [(ngModel)]="paymentAmount">    
            </div>
            <div class="p-2"></div>
            <button class="border p-0 px-2 text-xs bg-slate-500 text-white font-bold h-8 rounded-md uppercase disabled:bg-gray-400" [disabled]="!generating || !paymentName || !paymentAmount" (click)="onAddPayment()">
                + Add
            </button>
                  
        </div>
    </form>
    <div class="p-2"></div>    
    <div class="text-xs uppercase font-bold opacity-50 py-2">payment list</div>
    <div class="container mx-auto">

        <!-- show grid Modal-->
        <div class="modal pointer-events-auto fixed w-full h-full top-0 left-0 flex items-center justify-center text-center" [ngClass]="showingPayment ? 'w-full' : 'opacity-0 w-0 h-auto'">
            <div class="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
            
            <div class="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            
            <!-- Add margin if you want to see some of the overlay behind the modal-->
            <div class="modal-content py-4 text-left px-6">
                <!--Title-->
                <div class="flex justify-between items-center pb-3">
                <p class="text-2xl font-bold">Grid</p>
                <div class="modal-close cursor-pointer z-50" (click)="onGridHide()">
                    <svg class="fill-current text-black" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18">
                    <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"></path>
                    </svg>
                </div>
                </div>
                
                <!--Body-->
                <div class="grid grid-cols-10 bg-slate-300">
                    <div *ngFor="let cell of showingPayment?.grid  " class="border text-center p-2 whitespace-pre">
                      {{ cell }}
                    </div>  
                  </div>
              

                <!--Footer-->
                <div class="flex justify-end pt-2">
                <button class="modal-close px-4 bg-gray-500 p-1 rounded-md text-white hover:bg-gray-400 h-8" (click)="onGridHide()" >Close</button>
                </div>
                
            </div>
            </div>
        </div>

        <ul class="flex flex-col">
            <li class="flex flex-row justify-between">
                <div class="w-2/3 uppercase text-sm border p-2"><span class="text-gray-400">name</span></div>
                <div class="w-1/6 uppercase text-sm border p-2 text-center"><span class="text-gray-400">amount</span></div>
                <div class="w-1/6 uppercase text-sm border p-2 text-center"><span class="text-gray-400">code</span></div>
                <div class="w-1/6 uppercase text-sm border p-2 text-center"><span class="text-gray-400">grid</span></div>
            </li>
              
            <li class="flex flex-row justify-between" *ngFor="let payment of payments ">
                <div class="w-2/3 uppercase text-sm border p-2">{{ payment.name }}</div>
                <div class="w-1/6 uppercase text-sm border p-2 text-center">{{ payment.amount }}</div>
                <div class="w-1/6 uppercase text-sm border p-2 text-center">{{ payment.code }}</div>
                <div class="w-1/6 uppercase text-sm border p-2 text-center cursor-help" (click)="onGridShow(payment)">
                    {{ payment.grid.length}}
                    <!-- https://heroicons.com/ -->
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
                    </svg>                            
                </div>
            </li>

        </ul>




    </div>

</div>


  */