const path = require('path');
const express = require('express'); 
const router = require('express').Router(); 

const productsController = require('../controllers/products')

router.get('/', productsController.getProducts)

module.exports = router; 