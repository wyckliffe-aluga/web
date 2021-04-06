const express = require('express'); 
const path = require('path');
const router = require('express').Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title})
    console.log(products);
    res.redirect('/');
});

exports.routes = router;
exports.products = products;