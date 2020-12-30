const Product = require('../models/product');
const Cart = require('../models/cart');
const { getCurrentUser } = require('../util/session');

exports.getProducts = async (req, res, next) => {
    try {
      const result = await Product.findAll();
      res.render('shop/product-list', {
        prods: result,
        pageTitle: 'All Products',
        path: '/products'
      });
    } catch (error) {
      console.log(error)
    }
};

exports.getProduct = async (req, res, next) => {
  const prodId = req.params.productId;
  try {
      const product = await Product.findByPk(prodId);
      const teste = await Product.findAll({where: {
        id: prodId
      }})
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    } catch (error) {
      console.log(error)
    }
};

exports.getIndex = async (req, res, next) => {
  try {
    const result = await Product.findAll();
    res.render('shop/index', {
      prods: result,
      pageTitle: 'Shop',
      path: '/'
    });
    
  } catch (error) {
    console.log(error)
  }
};

exports.getCart = async (req, res, next) => {
  try {
    const user = await getCurrentUser()
    const cart = await user.getCart()
    const products = await cart.getProducts()
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      products: products
    });
  } catch (error) {
    console.log(error)
  }
};

exports.postCart = async (req, res, next) => {
  const prodId = req.body.productId;
  const user = await getCurrentUser()
  const cart = await user.getCart()
  const products = await cart.getProducts({ where: { id: prodId } })
  if(products && products.length > 0){
    let cartItem = products[0].cartItem
    const oldQuantity = cartItem.quantity
    cartItem.quantity++
    const product = await Product.findByPk(prodId)
    await cart.addProduct(product, { through: {
      quantity: cartItem.quantity
     }})
  }
  else { 
    const product = await Product.findByPk(prodId)
    await cart.addProduct(product, { through: {
      quantity: 1
     }})
  }
  res.redirect('/cart');
};

exports.postCartDeleteProduct = async (req, res, next) => {
  const prodId = req.body.productId;
  const user = await getCurrentUser()
  const cart = await user.getCart()
  const products = await cart.getProducts({ where: { id: prodId } })
  if(products && products.length > 0){
    const cartItem = products[0].cartItem
    await cartItem.destroy()
  }

  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
