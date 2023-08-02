import axios from 'axios';

export const sica3Api = axios.create({
    url: `${ process.env.SICA3_BACK }`
});