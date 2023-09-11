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
exports.createNotificationQuery = void 0;
const UserInfo_1 = __importDefault(require("../models/UserInfo"));
const createNotificationQuery = ({ msg, id_addressee, is_case_especial_case, action, complement_action, name_module, id_seender, msg_to_action, info_sender }) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let create = {
                $set: {
                    id_addressee: id_addressee,
                },
                $push: {
                    notifications: {
                        msg,
                        is_case_especial_case,
                        info_especial_case_name_module: name_module,
                        action,
                        complement_action,
                        isView: 0,
                        isView_date: new Date(),
                        create_at: new Date(),
                        msg_to_action,
                        info_sender: info_sender ? JSON.stringify(Object.assign(Object.assign({}, info_sender), { id_seender })) : '',
                    },
                }
            };
            yield UserInfo_1.default.findOneAndUpdate({ id_addressee }, create, {
                new: true,
                upsert: true
            });
            resolve(true);
        }
        catch (err) {
            reject(false);
        }
    }));
};
exports.createNotificationQuery = createNotificationQuery;
