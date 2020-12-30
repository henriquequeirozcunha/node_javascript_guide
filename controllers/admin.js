const Product = require('../models/product');
const { getCurrentUserId, getCurrentUser } = require('../util/session')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = async (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  try {
    // const userId = await getCurrentUserId();
    // const result = await Product.create({
    //   title,
    //   price,
    //   imageUrl,
    //   description,
    //   userId
    // });
    const user = await getCurrentUser();
    const result = await user.createProduct({
      title,
      price,
      imageUrl,
      description
    })
    console.log('Product created successfully');
    res.redirect('/admin/products')
  } catch (error) {
    console.log(error);
  }
};

exports.getEditProduct = async (req, res, next) => {
  try {
    const editMode = req.query.edit;
    if (!editMode) {
      return res.redirect('/');
    }
    const prodId = req.params.productId;
    const product = await Product.findByPk(prodId)
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product,
    });
  } 
  catch (error) {
    console.log(error)
  }
};

exports.postEditProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;
    product = await Product.findByPk(prodId);
    if (product) {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDesc;
      product.save();
    }
    console.log('updated product');
    res.redirect('/admin/products');
  } catch (error) {
    console.log(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    // const products = await Product.findAll();
    const user = await getCurrentUser();
    const products = await user.getProducts();
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products',
    });
  } catch (error) {
    console.log(error);
  }
};

exports.postDeleteProduct = async (req, res, next) => {
  try {
    const prodId = req.body.productId;
    const product = await Product.findByPk(prodId)
    product.destroy()
    console.log('Product Destroyed')
    res.redirect('/admin/products');
    
  } catch (error) {
    console.log(error)
  }
};
