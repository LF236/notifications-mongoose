"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const NotificationSchema = new mongoose_1.Schema({
    msg: {
        type: String,
        require: true
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
    msg_to_action: {
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
const UserInfoSchema = new mongoose_1.Schema({
    id_addressee: {
        type: Number,
        require: true,
        index: true,
        unique: true,
        ref: 'PettyCash',
    },
    notifications: [NotificationSchema]
});
UserInfoSchema.plugin(mongoose_paginate_v2_1.default);
// interface InstitutionDocument extends Document, InstitutionData {}
// export default model< InstitutionDocument, PaginateModel<InstitutionDocument> >( 'UserInfo', UserInfoSchema );
exports.default = (0, mongoose_1.model)('UserInfo', UserInfoSchema);
