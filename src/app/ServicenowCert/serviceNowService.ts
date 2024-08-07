import axios from 'axios';
import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

const certPath = path.resolve(__dirname, '../certs/intverseCA.pem');
const keyPath = path.resolve(__dirname, '../certs/intverse_key.pem');

// Load certificates and key
const cert = fs.readFileSync(certPath);
const key = fs.readFileSync(keyPath);

const instance = axios.create({
    baseURL: 'https://dev258244.service-now.com/api/now',
    httpsAgent: new https.Agent({
        cert: cert,
        key: key,
        ca: cert, // Verify this is correct or if a separate CA cert is needed
        passphrase: 'intverse', // Ensure this is correct
        rejectUnauthorized: false // Set to true for production environments
    }),
    // auth: {
    //     username: 'intverse',
    //     password: '@HEyOU.Dx4>n!0NG#<cCxz@L4_Tl+Q@u?pT1cz8$HZzs6Q$GE421Y@}IdT_>$tr^Tk1CUNA)(UeU_R1X:!!{9n+e>d6AmU!-zY$4'
    // }
});

export const getTickets = async () => {
    try {
        const response = await instance.get('/table/incident');
        console.log('Tickets:', response.data.result);
    } catch (error: any) {
        if (error.response) {
            console.error('Error response:', error.response.data);
            console.error('Error status:', error.response.status);
        } else if (error.request) {
            console.error('Error request:', error.request);
        } else {
            console.error('Error message:', error.message);
        }
        console.error('Full error details:', error);
    }
};

// Enable SSL/TLS handshake logging
process.env.NODE_DEBUG = 'tls';

