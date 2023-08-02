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
exports.getMyNotifications = exports.createNotification = void 0;
const UserInfo_1 = __importDefault(require("../models/UserInfo"));
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { msg, id_addressee, is_case_especial_case, action, complement_action, name_module, id_seender } = req.body;
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
                    info_sender: req.info_seender_user ? JSON.stringify(Object.assign(Object.assign({}, req.info_seender_user), { id_seender })) : ''
                }
            }
        };
        let aux = yield UserInfo_1.default.findOneAndUpdate({ id_addressee }, create, {
            new: true,
            upsert: true
        });
        //* Registrar sin información de usuario remitente
        return res.json({
            ok: true,
            msg: 'Notification Success'
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Por favor contacta al Devops ;)'
        });
    }
});
exports.createNotification = createNotification;
const getMyNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_usuario = req.id_usuario;
        const { page } = req.query;
        if (!page) {
            return res.status(401).json({
                ok: false,
                msg: 'Request Invalid'
            });
        }
        // let skip = parseInt( page ) + 1;
        // skip = ( 10 * skip ) - 10;
        const aux = yield UserInfo_1.default.find({
            id_addressee: id_usuario,
        }, {
            notifications: {
                $equal: {
                    isView: true
                },
                $slice: [
                    0, 1
                ]
            }
        });
        console.log(aux);
        res.status(201).json({
            ok: true,
            aux
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error interno, contacte con el Devops'
        });
    }
});
exports.getMyNotifications = getMyNotifications;
