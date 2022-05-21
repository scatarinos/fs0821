import { PaymentData } from "./models";

const sqlite3 = require('sqlite3').verbose();


class Sqlite3Adaptor {
  db: any

  constructor() {
    this.db = new sqlite3.Database(':memory:', {});
    this.db.serialize(() => {
      this.db.run(`
        CREATE TABLE payments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT,
          amount REAL,      
          code TEXT,
          grid TEXT
        )  
      `);  
    })      
  }

  async all(query: string, params: Array<any> = []) {
    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err: ErrorEvent, data: any) => {
        if(err) {
          reject(err)
        } else {
          resolve(data)
        }
      })
    })
  }

  async getPayments() {
    const result: Array<PaymentData> = await this.all('SELECT * from payments order by id desc limit 10') as Array<PaymentData>
    // convert db array as string to array
    return result.map((row: any) => ({...row, grid: row.grid.toString().split(',') }))
  }

  async addPayment(payload: PaymentData) {    
    const {name, amount, code, grid} = payload
    await this.all("INSERT INTO payments (name, amount, code, grid) VALUES (?, ?, ?, ?)", [name, amount, code, grid])
    return await this.getPayments()
  }
}


export {
    Sqlite3Adaptor as adaptor
}