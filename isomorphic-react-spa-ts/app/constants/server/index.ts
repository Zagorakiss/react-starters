export const server = {
    env: process.env.NODE_ENV || 'development',
    host: process.env.HOST || 'localhost',
    port: parseInt(process.env.PORT, 10) || 9010
};

export const api = 'http://5994fc32b963e100113b6d59.mockapi.io/api/';
export const localApi = 'http://127.0.0.1/api';
