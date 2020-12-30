const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

const seedData = async () => {
    const userAdmin = await User.findAll({
        email: 'henrique@test.com'
    });
    if(!userAdmin){
        await User.create({
            name: 'Henrique Queiroz',
            email: 'henrique@test.com',
            password: 'any_password'
        })
    }
}

const startApp = async () => {
  try {
    const connection = await sequelize.sync({force: true});
    await seedData();
    app.listen(3000);
    console.log('app listening to port 3000');
  } catch (error) {
      console.log(error)
  }
};

startApp();