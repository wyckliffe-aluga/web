const mongodb = require('mongodb');
const getDb = require('../util/database').getDb;

class Product {
  constructor(title, price, imageUrl, description, id, userId) {
    this.title = title, 
    this.price = price, 
    this.imageUrl = imageUrl,
    this.description = description, 
    this._id = id ?  new mongodb.ObjectId(id) : null;
    this.userId = userId;
  }
  save() {
    const db = getDb();
    let dpOp ;
    if (this._id) {
      // update the product
      dpOp = db.collection('products')
             .updateOne({_id: this._id}, {$set: this});
    } else {
      dpOp = db
      return db.collection('products')
      .insertOne(this)
    }
      return dpOp.then(result => {
          console.log('yaay go it');
      })
      .catch(err => console.log(err));
  }

  static fetchAll() {
    const db = getDb();
    return db.collection('products')
      .find()
      .toArray()
      .then(products => {
        console.log(products);
        return products;
      })
      .catch(err => console.log(err))
  }

  static findById(proId) {
    const db = getDb(); 
    return db.collection('products')
      .find({_id: new mongodb.ObjectId(proId)})
      .next()
      .then( product => {
          console.log('found it!!')
          return product;
      })
      .catch(err => console.log(err))
  }

  static deleteById(proId) {
    const db = getDb(); 
    return db.collection('products')
      .deleteOne({_id: new mongodb.ObjectId(proId)})
      .then(result => {
        console.log('Deleted');
      })
      .catch(err => console.log(err));
  }
}

module.exports = Product; 