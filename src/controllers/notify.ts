import { Response } from 'express';
import { AddNotifyePostRequestInterface } from '../interface/notifyInterface';
import UserInfo from '../models/UserInfo';

export const createNotification = async ( req: any, res: Response ) => {
    try{
        const { msg, id_addressee, is_case_especial_case, action, complement_action, name_module, id_seender, msg_to_action } : AddNotifyePostRequestInterface = req.body;
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
                    msg_to_action,
                    info_sender: req.info_seender_user ? JSON.stringify( {
                        ...req.info_seender_user, id_seender
                    } ) : '',

                },
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
        let skip = parseInt( page ) + 1;
        skip = ( 10 * skip ) - 10;


        const aux = await UserInfo.aggregate( [
            {$unwind : "$notifications"},
            {$sort : {"notifications.create_at":-1}},
            {
                $match: {
                    "notifications.isView":false,
                    "id_addressee": id_usuario
                }
            },
            {$skip: skip},
            {$limit: 10},
            {"$group": {"_id": "$_id", "notifications": {"$push": "$notifications"}}},
        ] )


        res.status( 201 ).json({
            ok: true,
            notifications: aux ? aux[ 0 ].notifications : []
            

        });
    } catch( err ) {
        console.log( err );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error interno, contacte con el Devops'
        });
    }
}

export const markAsViewed = async( req: any, res: Response ) => {
    const userInfoTransaction = await UserInfo.startSession();
    userInfoTransaction.startTransaction();
    try {
        const { ids_to_view } = req.body;
        const id_user = req.id_usuario;
        console.log( id_user );
        if( !ids_to_view || ids_to_view.length < 1 ) {
            return res.status( 401 ).json({
                ok: false,
                msg: 'Request Invalid'
            });
        }
    
        if( !id_user ) {
            return res.status( 401 ).json({
                ok: false,
                msg: 'Request Invalid'
            });
        }
    
        // VALIDAR QUE EL ID DEL USUARIO ESTE REGISTRADO EN LA DB DE NOTIFICACIONES
        const userInfo = await UserInfo.findOne( { id_addressee: id_user } );
        if( !userInfo ) {
            return res.status( 401 ).json({
                ok: false,
                msg: 'No user notifications exists'
            });
        }
        
        // 64cbd700f79d968336ae4262
        let promisesOfUpdateNotifications: any = [];
        
        // BARRER EL ARREGLO DE ID'S A CAMBIAR
        ids_to_view.map( ( id: string ) => {
            promisesOfUpdateNotifications.push(
                UserInfo.findOneAndUpdate( { id_addressee: id_user, "notifications._id": `${ id }` }, { "notifications.$.isView": true, "notifications.$.isView_date": new Date() } )
            )
        } );

        Promise.all( promisesOfUpdateNotifications )
        .then( resPromise => {
            res.json({
                ok: true,
                msg: 'Notifications updated successfully'
            });
        } )
        .catch( err => {
            console.log( err );
            res.status( 500 ).json({
                ok: false,
                msg: 'Error, contacta al Devops'
            });
        } )

        // await UserInfo.findOneAndUpdate( { id_addressee: id_user, "notifications._id": '64cbd700f79d968336ae4262' }, { "notifications.$.msg": 'Vamos a las bandidas' } );            

        await userInfoTransaction.commitTransaction();
        userInfoTransaction.endSession();
    }
    catch( err ) {     
        console.log( err );
        await userInfoTransaction.abortTransaction();
        userInfoTransaction.endSession();
        res.status( 500 ).json({
            ok: false,
            msg: 'Error, contacta al Devops'
        });
    }
}

export const countNotifications = async( req: any, res: Response ) => {
    try {
        const id_usuario = req.id_usuario;
        const total = await UserInfo.aggregate( [
            {
                $match: {
                    "id_addressee": id_usuario
                }
            },

            { $unwind : "$notifications" },

            {
                $match: { "notifications.isView": false }
            },

            {
                "$group": {
                  "_id": "$id",
                  "total": {"$sum": 1}
                }
            }
        ] );

        res.status( 200 ).json({
            ok: true,
            msg: 'Query ok',
            total: total.length > 0 ? total[ 0 ].total : 0
        });
    }
    catch( err ) {
        console.log( err );
        res.status( 500 ).json({
            ok: false,
            msg: 'Error, contacta al Devops'
        });
    }
}