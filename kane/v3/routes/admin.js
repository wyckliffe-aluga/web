const express = require('express'); 
const path = require('path');
const router = require('express').Router();

const products = [];

router.get('/add-product', (req, res, next) => {
    res.render('add-product.pug', {pageTitle: 'Add Product'})
});

router.post('/add-product', (req, res, next) => {
    products.push({title: req.body.title})
    res.redirect('/');
});

exports.routes = router;
exports.products = products;