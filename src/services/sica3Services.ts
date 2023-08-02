import { sica3Api } from "../api/sica3Api";
import { GetInfoEmpleadoInterface } from "../interface/sica3RequestInterface";

export const getNameAndEnrollmentById = ( id: number ) : Promise<GetInfoEmpleadoInterface | null> => {
    return new Promise( async ( resolve, reject ) => {
        try {
            const data = await sica3Api.get( `/api/rhumanos/empleado/${ id }` );
            resolve( data.data );
        }
        catch( err  ){
            reject( null );
        }
    } );
}