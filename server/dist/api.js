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
const express_1 = require("express");
const sqlite_adaptor_1 = require("./sqlite.adaptor");
const myDB = new sqlite_adaptor_1.adaptor();
const ALLOWED_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.send('Running api...');
});
router.get('/generate', (req, res) => {
    var _a;
    // check bias character
    const bias = `${(_a = req.query.bias) !== null && _a !== void 0 ? _a : '-'}`;
    const isValidBias = bias.length > 0 && ALLOWED_CHARS.includes(bias);
    // calculate lists length
    const numberOfCells = 100;
    const numberOfBiasedCells = 20 * (isValidBias ? 1 : 0);
    // biased cells
    const biasedCells = Array(numberOfBiasedCells).fill(bias);
    // real random cells
    // bias character not excluded from real random, so bias character occurences could be more than 20%
    // to exclude bias - something like : ALLOWED_CHARS.splice(ALLOWED_CHARS.indexOf(bias, 1))  ...
    const randomCells = [...Array(numberOfCells - numberOfBiasedCells).keys()] // iterable array
        .map(() => ALLOWED_CHARS[Math.floor(Math.random() * ALLOWED_CHARS.length)]); // random char from ALLOWED_CHARS
    // concat lists and suffle result
    const result = biasedCells.concat(randomCells) // join lists
        .sort(() => Math.random() - 0.5); // suffle
    res.json(result);
});
router.get('/payments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.json(yield myDB.getPayments());
}));
router.post('/payments', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const result = yield myDB.addPayment(payload);
    res.json(result);
}));
exports.default = router;
