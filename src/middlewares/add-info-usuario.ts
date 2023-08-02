import { Response, NextFunction } from 'express';
import { getNameAndEnrollmentById } from '../services/sica3Services';
import { AddNotifyePostRequestInterface } from '../interface/notifyInterface';
export const addInfoUsuario = async ( req: any, res: Response, next: NextFunction ) => {
    try {
        const { id_seender } : AddNotifyePostRequestInterface = req.body;
        if( id_seender ) {
            let info_user = await getNameAndEnrollmentById( id_seender );
            req.info_seender_user = info_user;
        }    
        next();
    }
    catch( err ) {
        res.status( 500 ).json({
            ok: false,
            msg: 'Error en la comunicación con SICA'
        });
    }
}