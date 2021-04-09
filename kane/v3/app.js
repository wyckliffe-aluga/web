const express = require('express'); 
const path = require('path');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./model/product');
const User = require('./model/user');

const app = express() ; 

//app.engine('handlebars', expressHbs());
//app.set('view engine', 'handlebars');
//app.set('view engine', 'pug');
app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin') ; 
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findOne({where: {id: 'gqpkkn9j7m4k'}})
    .then(user => {
        req.user = user;
        next();
    })
    .catch(err => {
        console.log(err);
    });
});


app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// A user created this product
Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize
     //.sync({force: true})
    .sync()
    .then( result => {
        return User.findOne({where: {id: 'gqpkkn9j7m4k'}});
    })
    .then( user => {
        if(!user) {
            return  User.create({
                id: 'gqpkkn9j7m4k', 
                firstName: 'Tony', 
                lastName: 'Stark',
                email: 'tony@stark.com'
            });
        return Promise.resolve(user);
        }
    })
    .then(user => {
        //console.log(user);
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });


