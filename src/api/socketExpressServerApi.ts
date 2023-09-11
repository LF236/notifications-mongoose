import axios from 'axios';

export const socketExpressServerApi = axios.create({
    url: `${ process.env.SOCKET_IP }`
});