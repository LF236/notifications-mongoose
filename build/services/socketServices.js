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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageToUpdateNotificationFromSocket = void 0;
const axios_1 = __importDefault(require("axios"));
const messageToUpdateNotificationFromSocket = (ids_to_update) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, axios_1.default)({
                method: 'POST',
                url: `${process.env.SOCKET_IP}/updateNotification`,
                data: ids_to_update
            });
            resolve(true);
        }
        catch (err) {
            console.log(err);
            console.log(process.env.SOCKET_IP);
            resolve(false);
        }
    }));
};
exports.messageToUpdateNotificationFromSocket = messageToUpdateNotificationFromSocket;
