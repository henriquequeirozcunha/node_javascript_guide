const Cart = require('../../models/cart')
const { getCurrentUser } = require('../../util/session')

exports.seedData = async () => {
    const user = await getCurrentUser()
    await user.createCart()
}

