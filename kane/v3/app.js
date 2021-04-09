const express = require('express'); 
const path = require('path');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./model/product');
const User = require('./model/user');
const Cart = require('./model/cart');
const CartItem = require('./model/cart-item');
const Order = require('./model/order');
const OrderItem = require('./model/order-item');
const uniqid = require('uniqid');

const app = express() ; 

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin') ; 
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findOne({where: {id: 1}})
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
Product.belongsTo(User);
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User); 
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart,  { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

sequelize
    //.sync({force: true})
    .sync()
    .then( result => {
        return User.findOne({where: {id: 1}});
    })
    .then( user => {
        if(!user) {
            return  User.create({
                id: 1, 
                key: uniqid().toString(),
                firstName: 'Tony', 
                lastName: 'Stark',
                email: 'tony@stark.com'
            });
        }
        return user;
    })
    .then(user => {
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });


