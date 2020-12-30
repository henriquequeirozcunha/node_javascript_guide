const User = require('../../models/user');

exports.seedData = async () => {
  const userAdmin = await User.findAll({
    where: {
      email: 'seed@seed.com',
    },
  });
  if (userAdmin && userAdmin.length == 0) {
    const userSeeded = await User.create({
      name: 'Seeded User',
      email: 'seed@seed.com',
      password: 'any_password',
    });
    if(userSeeded){
      console.log('User Seeded Successfully');
    }
  }
};
