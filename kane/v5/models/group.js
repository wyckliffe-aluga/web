const mongoose = require('mongoose'); 
const  Schema = mongoose.Schema; 

const groupSchema = new Schema({
    name : {
        type: String, 
        required: true
    },
    accountNo: {
        type: Number, 
        required: true
    }, 
    district : {
        type: String, 
        required: true
    },
    accountBal: {
        type: Number, 
        required: true,
    },
    description: {
        type: String, 
        required: true
    },
    userId : {
        type: Schema.Types.ObjectID, 
        ref: 'User', 
        required: true
    },
    farmers: {
       farmers: [{ farmerId: {type: Schema.Types.ObjectId, ref: 'Farmer',}}]
    }

});

groupSchema.methods.addToGroup = function(farmerId) {
    fms = []
    fms.push(farmerId);
    this.farmers.farmers = fms ; 
    return this.save();
}

module.exports = mongoose.model('Group', groupSchema ) ;