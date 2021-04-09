const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db ;

const uri = "mongodb+srv://duka:MWrbPKr2ntgycM1n@stark.4xuge.mongodb.net/duka?retryWrites=true&w=majority";

const mongoConnect = (callback) => {

    MongoClient.connect(uri)
        .then(client => {
            console.log('Connected!'); 
            _db = client.db();
            callback();
         })
         .catch( err => {
            console.log(err);
            throw err;
    })
}

const getDb = () => {
    if(_db) {
        return _db;
    }
    throw 'No Database found';
};

exports.mongoConnect = mongoConnect ;
exports.getDb = getDb; 