require('dotenv').config({ path: '../.env' });
const mysql = require('mysql2')
console.log(process.env.DB_HOST, "prova")
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

});

connection.connect((err) => {
    if (err) throw err

    console.log('Connect to MYSQL')
})

module.exports = connection