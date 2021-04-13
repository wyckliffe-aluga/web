const mongoose = require('mongoose'); 
const  Schema = mongoose.Schema; 

const classSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String, 
        required: true
    }, 
    instructor : {
        type: String, 
        required: true
    }, 
    lessons: [{
        lesson_number: {type: Number},
        lesson_title:  {type: String}, 
        lesson_body : {type: String}
    }],
    userId : {
        type: Schema.Types.ObjectId, ref: 'User', required: true 
    }

});

module.exports = mongoose.model('Class', classSchema ) ;