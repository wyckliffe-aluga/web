const bcrypt = require('bcryptjs');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const transport = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: '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'
    }
}));

exports.getLogin = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null;
    }
    res.render('auth/login', {
        path: '/login', 
        pageTitle: 'Login',
        errorMessage: message
    });
}

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({ email: email })
      .then(user => {
        if (!user) {
            req.flash('error', 'Invalid email or password.');
          return res.redirect('/login');
        }
        bcrypt
          .compare(password, user.password)
          .then(doMatch => {
            if (doMatch) {
              req.session.isLoggedIn = true;
              req.session.user = user;
              return req.session.save(err => {
                console.log(err);
                res.redirect('/');
              });
            }
            req.flash('error', 'Invalid email or password.');
            res.redirect('/login');
          })
          .catch(err => {
            console.log(err);
            res.redirect('/login');
          });
      })
  .catch(err => console.log(err));
};
    
exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err);
        res.redirect('/');
    });
};

exports.getSignUp = (req, res, next) => {
    let message = req.flash('error');
    if (message.length > 0) {
        message = message[0]
    } else {
        message = null;
    }
    res.render('auth/signup' , {
        path: '/signup', 
        pageTitle: 'SignUp',
        errorMessage: message
    });
};

exports.postSignUp = (req, res, next) => {
    const fname = req.body.fname; 
    const lname = req.body.lname;
    const email = req.body.email; 
    const password = req.body.password; 
    const confirmPassword = req.body.confirmPassword; 

    User.findOne({email: email})
        .then(userDoc => {
            if (userDoc) {
                req.flash('error', 'e-mail exists already, please pick another email.');
                return res.redirect('/signup');
            }
            return bcrypt
            .hash(password, 12)
            .then(hashedPassword => {
                const user = new User ({
                    firstName: fname, 
                    lastName: lname, 
                    email: email, 
                    password: hashedPassword,
                    cart: {
                        items: []
                    }
                }); 
                return user.save(); 
            });
        })
        .then(result => {
            res.redirect('/login');
        })
        .catch(err => console.log(err));
};