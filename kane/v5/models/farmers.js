const mongoose = require('mongoose'); 
const  Schema = mongoose.Schema; 

const farmersSchema = new Schema({
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
    }

});

module.exports = mongoose.model('Farmer', farmersSchema ) ;