const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose') ;
const session  = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session) ;
const User = require('./models/user');

const errorController = require('./controllers/error');

const MONGODBURI =   "mongodb+srv://duka:MWrbPKr2ntgycM1n@stark.4xuge.mongodb.net/universe?retryWrites=true&w=majority" ;

const app = express();
const store = new mongoDBStore({
  uri: MONGODBURI,
  collection: 'sessions'
});


app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'you', 
    resave: false, 
    saveUninitialized: false, 
    store: store
  }));

app.use((req, res, next) => {
  if(!req.session.user) {
    return next();
  }
  
  User.findById(req.session.user._id)
  .then(user => {
      req.user = user;
      next();
  })
  .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    MONGODBURI 
    )
  .then(result => {
    User.findOne()
    .then( user => {
      if (!user) {
        const user = new User({
          firstName: 'Tony', 
          lastName: 'Stark', 
          email: 'tony@stark.com',
          cart: {
            items: []
          }
        }); 
        user.save();
      }
    })
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });
