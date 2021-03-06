const Product = require('../model/product');
const { v1: uuidv1, v4: uuidv4} = require('uuid');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
    const key = uuidv4().toString();
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    console.log(req.user);
    req.user
      .createProduct({
        key: key,
        title: title,
        imageUrl: imageUrl,
        price: price, 
        description: description,
      })
      .then( result => {
        console.log('Product Created Successfully')
        res.redirect('/admin/products');
      })
      .catch( err => {
        console.log(err);
      });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const prodId = req.params.productId; 
    //console.log(req);
    //req.user.getProducts({where: })
    Product.findOne({where: {id: prodId}})
      .then(product => {
        if (!product) {
          return res.redirect('/');
        }
        res.render('admin/edit-product', {
          pageTitle: 'Edit Product', 
          path: '/admin/edit-product', 
          editing: editMode, 
          product: product
        });
      })
      .catch( err => {
        console.log(err)
      });
  };

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId ;
    const updatedTitle = req.body.title; 
    const updatedPrice = req.body.price ; 
    const updatedImageUrl = req.body.imageUrl; 
    const updatedDesc = req.body.description; 

    Product.findOne({where: {id: prodId}})
      .then(product => {
        product.key = product.key;
        product.title = updatedTitle; 
        product.price = updatedPrice;
        product.imageUrl = updatedImageUrl; 
        product.description = updatedDesc;
        return product.save();
      })
      .then(result => {
        console.log("Updated Product");
        res.redirect('/admin/products');
      })
      .catch(err => {
         console.log(err);
    }); 
};

exports.getProducts = (req, res, next) => {
 // only show products related to this user
  req.user
    .getProducts()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch(err => {
      console.log(err)
    });
};

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId; 
    Product.findOne({where: {id: prodId}})
      .then(product => {
        return product.destroy();
      })
      .then( result => {
        console.log('Product destroyed');
        res.redirect('/admin/products');
      })
      .catch(err => {
        console.log(err);
    }); 
}