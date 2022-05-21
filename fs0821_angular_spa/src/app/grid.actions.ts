import { createAction, props } from '@ngrx/store';
import { Payment } from './grid.reducer';

export const toggleGenerating = createAction('[Grid] toggleGenerating')
export const setBias = createAction('[Grid] setBias', props<{ bias: string }>())
export const setGrid = createAction('[Grid] setGrid', props<{ grid: Array<string> }>())
export const setCode = createAction('[Grid] setCode', props<{ code: string }>())
export const setPayments = createAction('[Grid] setPayments', props<{ payments: Array<Payment> }>())
export const reset = createAction('[Grid] reset')