const Sequelize = require('sequelize'); 
const sequelize = require('../util/database');


const Product = sequelize.define('product', {
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
  title:{
    type:Sequelize.STRING,
    allowNull: false
  }, 
  price : {
    type: Sequelize.DOUBLE, 
    allowNull: false
  }, 
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: false
  }, 
  description:{
    type: Sequelize.TEXT('long'), 
    allowNull: false
  }
});

module.exports = Product; 