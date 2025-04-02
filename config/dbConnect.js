const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

db.connect((err) => {
    if (err) {
        console.log("Error connecting to the MySQL: ", err);
        process.exit(1);
    }
    console.log("Connected to the MySQL database!");
})

module.exports = db;