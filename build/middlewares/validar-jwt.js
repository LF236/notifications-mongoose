"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarJWT = (req, res, next) => {
    const token = req.header('x-access-token');
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: `Don't send token`
        });
    }
    try {
        const { id_usuario } = jsonwebtoken_1.default.verify(token, `${process.env.SECRET_JWT_SEED}`);
        console.log(id_usuario);
        req.id_usuario = id_usuario;
        next();
    }
    catch (err) {
        return res.status(401).send({
            ok: false,
            msg: 'Invalid Token'
        });
    }
};
exports.validarJWT = validarJWT;
