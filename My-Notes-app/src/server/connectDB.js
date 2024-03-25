const mysql = require('mysql2')
require('dotenv').config()
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

connection.connect((err) => {
    if (err){
        console.log("Error connecting to MySql: ", err.stack)
        return;
    }else {
        console.log("Connected to MySql  as ID: ", connection.threadId)

    }
})

module.exports = connection;