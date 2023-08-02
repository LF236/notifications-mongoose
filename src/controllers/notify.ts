import { Response } from 'express';
import { AddNotifyePostRequestInterface } from '../interface/notifyInterface';
import UserInfo from '../models/UserInfo';

export const createNotification = async ( req: any, res: Response ) => {
    try{
        const { msg, id_addressee, is_case_especial_case, action, complement_action, name_module, id_seender } : AddNotifyePostRequestInterface = req.body;
        let create: any = {
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
                    info_sender: req.info_seender_user ? JSON.stringify( {
                        ...req.info_seender_user, id_seender
                    } ) : ''
                }
            }
        }

        let aux = await UserInfo.findOneAndUpdate( { id_addressee }, create, {
            new: true,
            upsert: true
        } );
        //* Registrar sin información de usuario remitente
        return res.json({
            ok: true,
            msg: 'Notification Success'
        });

        
    } catch( err ) {
        console.log( err );
        res.status( 500 ).json({
            ok: false,
            msg: 'Por favor contacta al Devops ;)'
        });
    }
}

export const getMyNotifications = async ( req: any, res: Response ) => {
    try {
        const id_usuario = req.id_usuario;
        const { page } = req.query;
        if( !page ) {
            return res.status( 401 ).json({
                ok: false,
                msg: 'Request Invalid'
            });
        }
        // let skip = parseInt( page ) + 1;
        // skip = ( 10 * skip ) - 10;

        const aux = await UserInfo.find( {
           id_addressee: id_usuario,
           
        }, {
            notifications: {
                $equal: {
                    isView: true
                },
                $slice: [
                    0,1
                ]
               }
        } )
        console.log( aux );
        res.status( 201 ).json({
            ok: true,
            aux
            
        });
    } catch( err ) {
        console.log( err );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error interno, contacte con el Devops'
        });
    }
}