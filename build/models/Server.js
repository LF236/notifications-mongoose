"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const https_1 = require("https");
const fs_1 = __importDefault(require("fs"));
const cors_1 = __importDefault(require("cors"));
const notify_1 = __importDefault(require("../routes/notify"));
const config_1 = require("../database/config");
class Servidor {
    constructor() {
        this.app = (0, express_1.default)();
        this.port = parseInt(`${process.env.PORT}`);
        this.server = process.env.ENVIRONMENT == 'productivo'
            ? (0, https_1.createServer)({
                cert: fs_1.default.readFileSync('/cert/ssaver.gob.mx.crt'),
                key: fs_1.default.readFileSync('/cert/ssaver.gob.mx.key')
            }) : http_1.default.createServer(this.app);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({ origin: '*' }));
        this.app.use('/notify', notify_1.default);
        (0, config_1.dbConnection)();
    }
    execute() {
        this.middlewares();
        this.server.listen(this.port, () => {
            process.env.ENVIRONMENT == 'productivo'
                ? console.log(`Server Settings ready in https://notify.ssaver.gob.mx:${this.port}`.america)
                : console.log(`Server Settings ready in http://localhost:${this.port}`.rainbow);
        });
    }
}
exports.default = Servidor;
