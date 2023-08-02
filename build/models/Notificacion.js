"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const NotificacionSchema = new mongoose_1.Schema({
    msg: {
        type: String,
        require: true
    },
    id_addressee: {
        type: Number,
        require: true,
        index: true
    },
    //! ES UN JSON CON LA INFORMACIÓN DEL USUARIO -> DANGER
    info_sender: {
        type: String,
        require: false
    },
    is_case_especial_case: {
        type: Boolean,
        require: false
    },
    info_especial_case_name_module: {
        type: String,
        require: false
    },
    action: {
        type: String,
        require: true
    },
    complement_action: {
        type: String,
        require: false
    },
    isView: {
        type: Boolean,
        require: true,
    },
    isView_date: {
        type: Date,
        require: false,
    },
    create_at: {
        type: Date,
        require: true
    }
});
exports.default = (0, mongoose_1.model)('Notificacion', NotificacionSchema);
