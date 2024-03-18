const mysql = require('mysql2')
require('dotenv').config();
// create connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
})

// connect to database
connection.connect((err) => {
    if(err){
        console.error('Error in connecting to the database: ', err.message)
        return;
    }
    console.log('Connected to the database')
});
module.exports = connection;
