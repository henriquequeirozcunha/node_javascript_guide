const User = require('../models/user');

exports.getCurrentUser = async () => {
  // TODO: Get Current User by JWT instead of hardcoded email
  const userAdmin = await User.findAll({
    where: {
      email: 'henrique@test.com',
    },
  });
  return userAdmin[0];
};
exports.getCurrentUserId = async () => {
  console.log('entrou no metodo');
  // TODO: Get Current User by JWT instead of hardcoded email
  const userAdmin = await User.findAll({
    where: {
      email: 'henrique@test.com',
    },
  });
  console.log(userAdmin[0].id);
  return userAdmin[0].id;
};
