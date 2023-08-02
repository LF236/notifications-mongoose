"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sica3Api = void 0;
const axios_1 = __importDefault(require("axios"));
exports.sica3Api = axios_1.default.create({
    url: `${process.env.SICA3_BACK}`
});
