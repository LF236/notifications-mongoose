"use strict";
/*
    Prefix: /notify
*/
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const notify_1 = require("../controllers/notify");
const express_validator_1 = require("express-validator");
const validar_campos_1 = require("../middlewares/validar-campos");
const add_info_usuario_1 = require("../middlewares/add-info-usuario");
const validar_jwt_1 = require("../middlewares/validar-jwt");
const router = (0, express_1.Router)();
router.post('/add', [
    (0, express_validator_1.check)('msg', 'Es necesario enviar un mensaje').not().isEmpty(),
    (0, express_validator_1.check)('id_addressee', 'Es necesario el id del receptor').not().isEmpty().isNumeric(),
    (0, express_validator_1.check)('is_case_especial_case', 'Se necesita un Booleano').not().optional().isEmpty().isNumeric(),
    (0, express_validator_1.check)('action', 'Es necesario especificar una acción').not().isEmpty().trim(),
    (0, express_validator_1.check)('complement_action', 'Es necesario mandar un complemento a la acción').not().isEmpty().trim(),
    (0, express_validator_1.check)('id_seender', 'Se necesita el id del usuario remitente').not().optional().isEmpty().isNumeric(),
    (0, express_validator_1.check)('name_module', 'Se necesita el id del usuario remitente').not().isEmpty(),
    // check( 'info_especial_case_name_module', 'Es necesario especificar el nombre del modulo' ).if( body( 'is_case_especial_case' ).equals( '1' ) ).notEmpty(),
    validar_campos_1.validarCampos,
    add_info_usuario_1.addInfoUsuario
], notify_1.createNotification);
router.post('/add/modificacionExpediente', [
    (0, express_validator_1.check)('id_paciente', 'Es necesario enviar información del paciente').not().isEmpty(),
    validar_campos_1.validarCampos
], notify_1.createNotificationToChangeInExpediente);
router.get('/getMyNotifications', validar_jwt_1.validarJWT, notify_1.getMyNotifications);
router.get('/count', validar_jwt_1.validarJWT, notify_1.countNotifications);
router.put('/markAsViewed', validar_jwt_1.validarJWT, notify_1.markAsViewed);
exports.default = router;
