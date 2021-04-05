const express = require('express'); 
const path = require('path');

const router = require('express').Router(); 
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({extended: false}))

router.get('/add-product', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router; 