"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./api"));
const port = process.env.PORT || 3000;
const app = (0, express_1.default)();
// middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// routes
app.use('/api', api_1.default);
app.get('/ping', (req, res) => {
    res.send(`Pong! ${new Date().toISOString()}`);
});
app.listen(port, () => {
    console.log(`Running fs0821 server api on port ${port}`);
});
