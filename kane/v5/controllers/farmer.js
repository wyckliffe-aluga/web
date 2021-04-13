const generateUniqueId = require('generate-unique-id');
const Farmer = require('../models/farmer');
const Group = require('../models/group');

exports.getAddGroup = (req, res, next) => {
    res.render('farmers/edit-group', {
        pageTitle: 'Add Group', 
        path: '/admin/add-group', 
        editing: false,
    });
}

exports.postAddGroup = (req, res, next) => {
    const name = req.body.name;
    const accountNo = generateUniqueId({length: 6, useLetters: false});
    const district = req.body.district; 
    const description = req.body.description;
    
    const group = new Group({
        name: name, 
        accountNo: accountNo, 
        district : district, 
        description: description, 
        accountBal: 0 ,
        userId: req.user
    }); 
    group
        .save()
        .then(result => {
            console.log('create a group successfully');
            res.redirect('/admin/groups');
        })
        .catch(err => console.log(err));
};

exports.getGroups = (req, res, next) => {
    
    Group.find() 
        .then(groups => {
            res.render('farmers/groups', {
                groups: groups, 
                pageTitle: 'Groups', 
                path: '/admin/groups'
            });
        })
        .catch(err => console.log(err));
};

exports.getEditGroup = (req, res, next) => {
    const editMode = req.query.edit; 
    if(!editMode) {
        return res.redirect('/admin/groups');
    }
    const groupId = req.params.groupId ; 
    Group.findById(groupId)
        .then(group => {
            if(!group) {
                return res.redirect('/admin/groups');
            }
            res.render('farmers/edit-group', {
                pageTitle: 'Edit Group', 
                path: 'admin/edit-group', 
                editing: editMode, 
                group: group,
            });
        })
        .catch(err  => console.log(err));
};

exports.postEditGroup = (req, res, next) => {
    const groupId = req.body.groupId; 
    const updatedName = req.body.name;
    const updateDistrict = req.body.district; 
    const updateddescription = req.body.description;

    Group.findById(groupId)
        .then(group => {
            group.name = updatedName, 
            group.district = updateDistrict
            return group.save();
        })
        .then(result => {
            console.log("Group Updated!"); 
            res.redirect('/admin/groups');
        })
        .catch(err => console.log(err));
};


exports.postDeleteGroup = (req, res, next) => {
    const groupId = req.body.groupId; 

    Group.findByIdAndRemove(groupId)
        .then(() => {
        console.log('Group removed');
        res.redirect('/admin/groups');
        })
    .catch(err => console.log(err));
}

exports.getGroupDetail = (req, res, next) => {

    const groupId = req.params.groupId; 
    Group
        .findById(groupId)
        .then(group => {
            res.render('farmers/group-detail', {
                group : group,
                pageTitle: group.name, 
                farmers : fm,
                path: '/groups'
            });
        })
        .catch(err => console.log(err));
}

exports.getAddFarmer = (req, res, next) => {
    const groupId = req.params.groupId;
    Group
        .findById(groupId)
        .then( group => {
            res.render('farmers/edit-farmer', {
                pageTitle: 'Add Farmer', 
                group: group, 
                path: '/admin/add-farmer', 
                editing: false,
            });
        })
        .catch(err => console.log(err));
};

exports.postAddFarmer = (req, res, next) => {
    const accountNo = req.body.accountNo;
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const phonenumber = req.body.phonenumber; 
    const location = req.body.location;
    const farmsize = req.body.farmsize;

    const farmer = new Farmer({
        groupAccountNo : accountNo, 
        firstName : firstName,
        lastName  : lastName,
        phoneNumber : phonenumber,
        location : location, 
        farmSize: farmsize,
        userId : req.user, 
        balance: 0
    }); 
    farmer
    .save()
    .then( result => {
        console.log('created a farmer successfully');
        res.redirect('/admin/farmers');
    })
    .catch(err => console.log(err));
};

exports.getloadFarmers = (req, res, next) => {
    const accountNo = req.body.accountNo
    Farmer
        .find({groupAccountNo: accountNo})
        .then(farmers => {
            return fm = farmers;
        })
        .catch(err => {
            console.log(err)
        })

};

exports.getFarmers = (req, res, next) => {
    Farmer.find() 
    .then(farmers => {
        res.render('farmers/farmers', {
            farmers: farmers, 
            pageTitle: 'Farmers', 
            path: '/admin/farmers'
        });
    })
    .catch(err => console.log(err));
}