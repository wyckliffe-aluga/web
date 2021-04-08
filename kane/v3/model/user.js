const Sequelize = require('sequelize'); 
const sequelize = require('../util/database');

const User = sequelize.define('user', {
    key: {
        type: Sequelize.INTEGER, 
        autoIncrement: true, 
        allowNull: false, 
        primaryKey: true, 
    },
    id: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    firstName:{
        type:Sequelize.STRING,
        allowNull: false
    }, 
    lastName: {
        type:Sequelize.STRING,
        allowNull: false 
    },
      email: {
        type: Sequelize.STRING, 
        allowNull: false,
    }
});

module.exports = User; 