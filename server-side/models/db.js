import mysql from 'mysql';

import * as dotenv from 'dotenv'
dotenv.config();

const pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    pwd: process.env.pwd,
    database: 'cs348'
});

export default pool;