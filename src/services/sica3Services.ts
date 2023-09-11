import { sica3Api } from "../api/sica3Api";
import { GetInfoEmpleadoInterface, ListaEmployesByPermissionRequestInterface, NombrePacienteRequestInterface } from "../interface/sica3RequestInterface";

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

export const getNamePacienteRequest = ( id_paciente: number ) : Promise<NombrePacienteRequestInterface> => {
    return new Promise( async( resolve, reject ) => {
        try {
            const data = await sica3Api.get( `/api/sactum_falso/paciente/getNombre?id_paciente=${ id_paciente }` );
            resolve( data.data );
        }
        catch( err ) {
            reject( null );
        }
    } );
}

export const getEmployeesByPermissionRequest = ( permission: string ) : Promise<ListaEmployesByPermissionRequestInterface> => {
    return new Promise( async( resolve, reject ) => {
        try {
            const data = await sica3Api.get( `/api/sactum_falso/empleadosByPermiso?permiso=${ permission }` );
            resolve( data.data );
        }
        catch( err ) {
            reject( null );
        }
    } ); 
}