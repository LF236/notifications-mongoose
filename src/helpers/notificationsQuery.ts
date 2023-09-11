import { AddNotifyQueryInterface } from '../interface/notifyInterface'
import UserInfo from '../models/UserInfo';

export const createNotificationQuery = ( { msg, id_addressee, is_case_especial_case, action, complement_action, name_module, id_seender, msg_to_action, info_sender } : AddNotifyQueryInterface ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
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
                        info_sender: info_sender ? JSON.stringify( {
                            ...info_sender, id_seender
                        } ) : '',
                    },
                }
            }
    
            await UserInfo.findOneAndUpdate( { id_addressee }, create, {
                new: true,
                upsert: true
            } );

            resolve( true );
        }
        catch( err ) {
            reject( false );
        }
    } )
}