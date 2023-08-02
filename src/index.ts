require( 'dotenv' ).config();
require( 'colors' );
import express from 'express';
import Servidor from './models/Server';

const server = new Servidor();
server.execute();