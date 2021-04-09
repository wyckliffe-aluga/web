const Sequelize = require('sequelize'); 
const sequelize = require('../util/database');

const Order = sequelize.define('order', {
    id: {
      type: Sequelize.INTEGER, 
      autoIncrement: true,
      allowNull: false, 
      primaryKey:true
    }, 

    orderNo: {
    type: Sequelize.STRING,
    allowNull: false,
  }
    // some fields to add 
    // - delivery address
    // - group No/Name 
    // - User who placed 
}); 

module.exports = Order; 