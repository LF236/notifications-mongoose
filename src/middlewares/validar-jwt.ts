import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

export const validarJWT = ( req: any, res: Response, next: NextFunction ) => {
    const token = req.header( 'x-access-token' );
    if( !token ) {
        return res.status( 401 ).json({
            ok: false,
            msg: `Don't send token`
        });
    }

    try {
        const { id_usuario } : any = jwt.verify(
            token,
            `${ process.env.SECRET_JWT_SEED }`
        );
        req.id_usuario = id_usuario;
        next();
    } catch( err ) {
        return res.status( 401 ).send({
            ok: false,
            msg: 'Invalid Token'
        });
    }
}