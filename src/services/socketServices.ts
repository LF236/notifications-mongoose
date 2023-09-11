import axios from "axios";
import { socketExpressServerApi } from "../api/socketExpressServerApi";

export const messageToUpdateNotificationFromSocket = ( ids_to_update: number[] ) => {
    return new Promise( async ( resolve, reject ) => {
        try {
            await axios( {
                method: 'POST',
                url: `${ process.env.SOCKET_IP }/updateNotification`,
                data: ids_to_update
            } );
            resolve( true );
        }
        catch( err ) {
            console.log( err );
            console.log( process.env.SOCKET_IP )
            resolve( false );
        }
    } );
}