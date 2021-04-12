const express = require('express');

const farmerController = require('../controllers/farmer');
const isAuth =require('../middleware/is-auth'); 
const farmer = require('../models/farmer');

const router = express.Router();

router.get('/add-group', isAuth, farmerController.getAddGroup);
router.post('/add-group', isAuth, farmerController.postAddGroup);
// get groups 
router.get('/groups', isAuth, farmerController.getGroups);
// add edit
router.get('/edit-group/:groupId', isAuth, farmerController.getEditGroup);
router.post('/edit-group', isAuth, farmerController.postEditGroup);
// delete group 
router.post('/delete-group', isAuth, farmerController.postDeleteGroup);
// load group details 
router.get('/group-detail/:groupId', isAuth, farmerController.getGroupDetail);

// load farmer 
router.get('/add-farmer/:groupId', isAuth, farmerController.getAddFarmer); 
router.post('/add-farmer', isAuth, farmerController.postAddFarmer);
router.post('/load-farmer', isAuth, farmerController.getloadFarmers);

// load farmers 
router.get('/farmers',isAuth, farmerController.getFarmers );

module.exports = router;