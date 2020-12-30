const Product = require('../../models/product');

exports.seedData = async () => {
  const products = await Product.findAll();
  if (products && products.length == 0) {
    const productSeeded = await Product.create({
      title: 'Product Seeded by SeedData',
      price: 10.0,
      imageUrl:
        'https://images.pexels.com/photos/6230972/pexels-photo-6230972.jpeg?auto=compress&amp;cs=tinysrgb&amp;dpr=3&amp;h=750&amp;w=1260',
      description: 'Product Seeded by SeedData',
    });
    if(productSeeded){
        console.log('Product Seeded successfully')
    }
  }
};
