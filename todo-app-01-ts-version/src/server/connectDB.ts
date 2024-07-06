import  mysql from 'mysql2';
require('dotenv').config();
// create connection

const sql = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})


export default sql;
