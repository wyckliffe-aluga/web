const mongoose = require('mongoose'); 
const  Schema = mongoose.Schema; 

const farmersSchema = new Schema({
    groupAccountNo : {
        type: Number, 
        required: true
    },
    firstName : {
        type: String, 
        required: true
    },
    lastName : {
        type: String, 
        required: true
    }, 
    phoneNumber : {
        type: Number, 
        required: true
    }, 
    location : {
        type: String, 
        required: true
    }, 
    farmSize: {
        type: Number,
        require: true
    }, 
    balance: {
        type: Number, 
        required: true
    },
    userId : {
        type: Schema.Types.ObjectId, ref: 'User', required: true 
    }

});

module.exports = mongoose.model('Farmer', farmersSchema ) ;