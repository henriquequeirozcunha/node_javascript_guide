const SeedUser = require('./user/seedUser')
const SeedCart = require('./cart/seedCart')
const SeedProduct = require('./product/seedProduct')

exports.seedData = async () => {
    await SeedUser.seedData()
    await SeedProduct.seedData()
    await SeedCart.seedData()
}