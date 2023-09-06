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
exports.countNotifications = exports.markAsViewed = exports.getMyNotifications = exports.createNotification = void 0;
const UserInfo_1 = __importDefault(require("../models/UserInfo"));
const createNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { msg, id_addressee, is_case_especial_case, action, complement_action, name_module, id_seender, msg_to_action } = req.body;
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
                    info_sender: req.info_seender_user ? JSON.stringify(Object.assign(Object.assign({}, req.info_seender_user), { id_seender })) : '',
                },
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
        let skip = parseInt(page) + 1;
        skip = (10 * skip) - 10;
        const aux = yield UserInfo_1.default.aggregate([
            { $unwind: "$notifications" },
            { $sort: { "notifications.create_at": -1 } },
            {
                $match: {
                    "notifications.isView": false,
                    "id_addressee": id_usuario
                }
            },
            { $skip: skip },
            { $limit: 10 },
            { "$group": { "_id": "$_id", "notifications": { "$push": "$notifications" } } },
        ]);
        res.status(201).json({
            ok: true,
            notifications: aux ? aux[0].notifications : []
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
const markAsViewed = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfoTransaction = yield UserInfo_1.default.startSession();
    userInfoTransaction.startTransaction();
    try {
        const { ids_to_view } = req.body;
        const id_user = req.id_usuario;
        console.log(id_user);
        if (!ids_to_view || ids_to_view.length < 1) {
            return res.status(401).json({
                ok: false,
                msg: 'Request Invalid'
            });
        }
        if (!id_user) {
            return res.status(401).json({
                ok: false,
                msg: 'Request Invalid'
            });
        }
        // VALIDAR QUE EL ID DEL USUARIO ESTE REGISTRADO EN LA DB DE NOTIFICACIONES
        const userInfo = yield UserInfo_1.default.findOne({ id_addressee: id_user });
        if (!userInfo) {
            return res.status(401).json({
                ok: false,
                msg: 'No user notifications exists'
            });
        }
        // 64cbd700f79d968336ae4262
        let promisesOfUpdateNotifications = [];
        // BARRER EL ARREGLO DE ID'S A CAMBIAR
        ids_to_view.map((id) => {
            promisesOfUpdateNotifications.push(UserInfo_1.default.findOneAndUpdate({ id_addressee: id_user, "notifications._id": `${id}` }, { "notifications.$.isView": true, "notifications.$.isView_date": new Date() }));
        });
        Promise.all(promisesOfUpdateNotifications)
            .then(resPromise => {
            res.json({
                ok: true,
                msg: 'Notifications updated successfully'
            });
        })
            .catch(err => {
            console.log(err);
            res.status(500).json({
                ok: false,
                msg: 'Error, contacta al Devops'
            });
        });
        // await UserInfo.findOneAndUpdate( { id_addressee: id_user, "notifications._id": '64cbd700f79d968336ae4262' }, { "notifications.$.msg": 'Vamos a las bandidas' } );            
        yield userInfoTransaction.commitTransaction();
        userInfoTransaction.endSession();
    }
    catch (err) {
        console.log(err);
        yield userInfoTransaction.abortTransaction();
        userInfoTransaction.endSession();
        res.status(500).json({
            ok: false,
            msg: 'Error, contacta al Devops'
        });
    }
});
exports.markAsViewed = markAsViewed;
const countNotifications = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id_usuario = req.id_usuario;
        const total = yield UserInfo_1.default.aggregate([
            {
                $match: {
                    "id_addressee": id_usuario
                }
            },
            { $unwind: "$notifications" },
            {
                $match: { "notifications.isView": false }
            },
            {
                "$group": {
                    "_id": "$id",
                    "total": { "$sum": 1 }
                }
            }
        ]);
        res.status(200).json({
            ok: true,
            msg: 'Query ok',
            total: total.length > 0 ? total[0].total : 0
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error, contacta al Devops'
        });
    }
});
exports.countNotifications = countNotifications;
