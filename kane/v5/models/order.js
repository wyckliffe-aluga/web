const mongoose = require('mongoose'); 

const Schema = mongoose.Schema; 

const orderSchema = new Schema({
    orderNo: {
        type: String, 
        required: true
    }, 
    products: [
        {
          product: { type: Object, required: true },
          quantity: { type: Number, required: true }
        }
      ],
      user: {
        fname: {
          type: String,
          required: true
        },
        lname: {
            type: String,
            required: true
        },
        userId: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'User'
        }
      }
}); 

module.exports = mongoose.model('Order', orderSchema);