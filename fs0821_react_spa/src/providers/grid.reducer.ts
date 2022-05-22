export interface PaymentData {
  name: string
  amount: number
  code: string
  grid: Array<string>
}

export class Payment {
  name: string
  amount: number
  code: string
  grid: Array<string>

  constructor(data: PaymentData) {
    const { name, amount, code, grid } = data
    this.name = name
    this.amount = amount
    this.code = code
    this.grid = grid
  }

}

export interface GridData {
    bias: string,
    generating: boolean,
    grid: Array<string>,
    code: string
    payments: Array<Payment>

}
export const initialState: GridData = {
    bias: '',
    generating: false,
    grid: Array<string>(100).fill(' '),
    code: '',
    payments: []
}


function fixCountIfGreaterThan9(originalCount: number):number {
    let result = originalCount
    let divider = 1
    while (result > 9) {
      divider++;
      result = Math.floor(originalCount / divider)
    }
    return result;
  }

function calculateCode(data: Array<string>) : string{
    const seconds = new Date().getSeconds()
    const x = Math.floor(seconds / 10)
    const y = seconds % 10
    const matchIndex1 = x * 10 + y
    const matchIndex2 = y * 10 + x
    const match1 = data[matchIndex1]
    const match2 = data[matchIndex2]
    const count1: number = fixCountIfGreaterThan9(data.filter(e => e === match1).length)
    const count2: number = fixCountIfGreaterThan9(data.filter(e => e === match2).length)
    
    const code = `${count1}${count2}`
    return code
}


export const reducer = (state: GridData, action: {type: string, payload: any}) => {
  switch(action.type) {
    
    case 'TOGGLE_GENERATING':
      return {...state, generating: !state.generating}
      
    case 'SET_BIAS':
      return { ...state, bias: action.payload.bias }

    case 'SET_GRID':
      const code = calculateCode(action.payload.grid)

      return {...state, grid: action.payload.grid, code: code}
    case 'GET_PAYMENTS':
      return { ...state, payments: action.payload.payments }

    default:
      return state
  }

}
