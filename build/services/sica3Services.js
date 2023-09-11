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
exports.getEmployeesByPermissionRequest = exports.getNamePacienteRequest = exports.getNameAndEnrollmentById = void 0;
const sica3Api_1 = require("../api/sica3Api");
const getNameAndEnrollmentById = (id) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield sica3Api_1.sica3Api.get(`/api/rhumanos/empleado/${id}`);
            resolve(data.data);
        }
        catch (err) {
            reject(null);
        }
    }));
};
exports.getNameAndEnrollmentById = getNameAndEnrollmentById;
const getNamePacienteRequest = (id_paciente) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield sica3Api_1.sica3Api.get(`/api/sactum_falso/paciente/getNombre?id_paciente=${id_paciente}`);
            resolve(data.data);
        }
        catch (err) {
            reject(null);
        }
    }));
};
exports.getNamePacienteRequest = getNamePacienteRequest;
const getEmployeesByPermissionRequest = (permission) => {
    return new Promise((resolve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const data = yield sica3Api_1.sica3Api.get(`/api/sactum_falso/empleadosByPermiso?permiso=${permission}`);
            resolve(data.data);
        }
        catch (err) {
            reject(null);
        }
    }));
};
exports.getEmployeesByPermissionRequest = getEmployeesByPermissionRequest;
