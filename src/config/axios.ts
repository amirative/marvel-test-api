import axios from 'axios';
import md5 from 'md5';
import dotenv from 'dotenv';
dotenv.config()

let timestamp: string;
let publicKey: string;
let privateKey: string;
let hash: string;
let myAxios: any;

let setup = () => {
    timestamp = Date.now() + '';
    publicKey = process.env.MARVEL_PUBLIC_KEY || '';
    privateKey = process.env.MARVEL_PRIVATE_KEY || '';
    hash = md5(timestamp + privateKey + publicKey);

    myAxios = axios.create({
        baseURL: process.env.MARVEL_API_URL || '',
        params: {
            ts: timestamp,
            apikey: publicKey,
            hash: hash
        }
    });
    
}

setup();

export default myAxios;