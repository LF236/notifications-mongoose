/*
    Prefix: /notify
*/

import { Router } from 'express';
import { countNotifications, createNotification, getMyNotifications, markAsViewed } from '../controllers/notify';
import { check, body } from 'express-validator';
import { validarCampos } from '../middlewares/validar-campos';
import { addInfoUsuario } from '../middlewares/add-info-usuario';
import { validarJWT } from '../middlewares/validar-jwt';
const router : Router = Router();

router.post( 
    '/add', 
    [
        check( 'msg', 'Es necesario enviar un mensaje' ).not().isEmpty(),
        check( 'id_addressee', 'Es necesario el id del receptor' ).not().isEmpty().isNumeric(),
        check( 'is_case_especial_case', 'Se necesita un Booleano' ).not().optional().isEmpty().isNumeric(),
        check( 'action', 'Es necesario especificar una acción' ).not().isEmpty().trim(),
        check( 'complement_action', 'Es necesario mandar un complemento a la acción' ).not().isEmpty().trim(),
        check( 'id_seender', 'Se necesita el id del usuario remitente' ).not().optional().isEmpty().isNumeric(),    
        check( 'name_module', 'Se necesita el id del usuario remitente' ).not().isEmpty(),    
        
        // check( 'info_especial_case_name_module', 'Es necesario especificar el nombre del modulo' ).if( body( 'is_case_especial_case' ).equals( '1' ) ).notEmpty(),
        validarCampos,
        addInfoUsuario
    ],
    
    createNotification 
);

router.get( '/getMyNotifications', validarJWT ,getMyNotifications );

router.get( '/count', validarJWT, countNotifications );

router.put( '/markAsViewed', validarJWT, markAsViewed );

export default router; 