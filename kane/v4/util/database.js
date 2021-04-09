const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const uri = "mongodb+srv://duka:MWrbPKr2ntgycM1n@stark.4xuge.mongodb.net/duka?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const mongoConnect = (callback) => {

    MongoClient.connect(uri)
        .then(result => {
            console.log('Connected!'); 
            callback(result);
         })
         .catch( err => {
            console.log(err);
    })
}

module.exports = mongoConnect ; 