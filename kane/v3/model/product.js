const fs = require('fs');
const path = require('path');
const { 
    v1: uuidv1,
    v4: uuidv4,
  } = require('uuid');

const p = path.join(path.dirname(require.main.filename), 
'data', 
'products.json'
);

const getProductsFromFile = cb => {
  
    fs.readFile(p, (err, fileContent) => {
        if (err) {
           return cb([]);
        }
            cb(JSON.parse(fileContent));
    });

}

module.exports = class Product{
    constructor(id, title, imageUrl, description, price){
        this.id = id;
        this.title = title; 
        this.imageUrl = imageUrl;
        this.description = description; 
        this.price = price;
    }

    save() {
        getProductsFromFile( products => {
            if (this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id)
                const updatedProducts = [...products] ;
                updatedProducts[existingProductIndex] = this ;

                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                }); 
            } else {
                this.id = uuidv4().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                 console.log(err);
              }); 
            } 
         });
    }
    static fetchAll(cb) {
        getProductsFromFile(cb);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product)
        });
    }
};