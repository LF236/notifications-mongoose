import colors from 'colors';
import express, { Express } from 'express';
import path from 'path';
import http from 'http';
import { createServer } from 'https';
import fs from 'fs';
import cors from 'cors';
import routerNotify from '../routes/notify';
import { dbConnection } from '../database/config';

class Servidor {
    private app: Express;
    private server: any;
    public port: number;

    constructor() {
        this.app = express();
        this.port = parseInt( `${ process.env.PORT }` );
        this.server = process.env.ENVIRONMENT == 'productivo'
            ? createServer({
                cert: fs.readFileSync('/cert/ssaver.gob.mx.crt'),
                key: fs.readFileSync('/cert/ssaver.gob.mx.key')

            }) : http.createServer( this.app );            
    }

    middlewares() {
        this.app.use( express.json() );
        this.app.use( cors( { origin: '*' } ) );
        this.app.use( '/notify', routerNotify );
        dbConnection();
    }

    execute() {
        this.middlewares();
        this.server.listen( this.port, () => {
            process.env.ENVIRONMENT == 'productivo'
                                        ? console.log( `Server Settings ready in https://notify.ssaver.gob.mx:${ this.port }`.america )
                                        : console.log( `Server Settings ready in http://localhost:${ this.port }`.rainbow );
        } );
    }
}

export default Servidor;