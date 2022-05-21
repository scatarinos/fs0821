"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adaptor = void 0;
const sqlite3 = require('sqlite3').verbose();
class Sqlite3Adaptor {
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
        });
    }
    all(query, params = []) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.db.all(query, params, (err, data) => {
                    if (err) {
                        reject(err);
                    }
                    else {
                        resolve(data);
                    }
                });
            });
        });
    }
    getPayments() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.all('SELECT * from payments order by id desc limit 10');
            // convert db array as string to array
            return result.map((row) => (Object.assign(Object.assign({}, row), { grid: row.grid.toString().split(',') })));
        });
    }
    addPayment(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, amount, code, grid } = payload;
            yield this.all("INSERT INTO payments (name, amount, code, grid) VALUES (?, ?, ?, ?)", [name, amount, code, grid]);
            return yield this.getPayments();
        });
    }
}
exports.adaptor = Sqlite3Adaptor;
