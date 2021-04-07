const path = require('path');
const express = require('express'); 
const router = require('express').Router(); 

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    const products =  adminData.products;
    res.render('shop', {prods: products, pageTitle: 'Shop', path: '/', hasProduct: products.length > 0});
});

module.exports = router; 