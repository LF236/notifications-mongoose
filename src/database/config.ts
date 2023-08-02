import mongoose from 'mongoose';
export const dbConnection = async () => {    
    try {
        await mongoose.connect( `${ process.env.DB_CNN }` );
        console.log( 'DB Online'.green );
    }
    catch( err ) {
        console.log( err );
        throw new Error( 'Error al conectar en la base de datos'.red );
    }
}