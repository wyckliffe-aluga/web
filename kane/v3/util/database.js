
const mysql = require('mysql2') ; 

const pool  = mysql.createPool({
    host: 'localhost', 
    user: 'root', 
    database: 'node-complete', 
    password: 'PjK5vYfR'
});

module.exports = pool.promise(); 