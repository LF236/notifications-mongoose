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
exports.addInfoUsuario = void 0;
const sica3Services_1 = require("../services/sica3Services");
const addInfoUsuario = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_seender } = req.body;
        if (id_seender) {
            let info_user = yield (0, sica3Services_1.getNameAndEnrollmentById)(id_seender);
            req.info_seender_user = info_user;
        }
        next();
    }
    catch (err) {
        res.status(500).json({
            ok: false,
            msg: 'Error en la comunicación con SICA'
        });
    }
});
exports.addInfoUsuario = addInfoUsuario;
