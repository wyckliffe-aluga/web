const express = require('express'); 
const path = require('path');
const bodyParser = require('body-parser');
const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./model/user');

const app = express() ; 

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin') ; 
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById('607072e44238e167109eec8c')
    .then(user => {
        req.user = new User(user.firstName, user.lastName, user.email, user._id);
        next();
    })
    .catch(err => {
        console.log(err);
    });
});


app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect((client) => {
    app.listen(3000);
});