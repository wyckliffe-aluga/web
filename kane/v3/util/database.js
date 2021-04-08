
//const mysql = require('mysql2') ; 

//const pool  = mysql.createPool({
//    host: 'localhost', 
//    user: 'root', 
//    database: 'node-complete', 
//    password: 'PjK5vYfR'
//});
//module.exports = pool.promise(); 

const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete', 'root', 'PjK5vYfR', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize ; 