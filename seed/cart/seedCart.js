const Cart = require('../../models/cart')
const { getCurrentUser } = require('../../util/session')

exports.seedData = async () => {
    const user = await getCurrentUser()
    const userCart = await user.getCart()
    if(userCart.lentgh == 0){
        await user.createCart()
    }
}

