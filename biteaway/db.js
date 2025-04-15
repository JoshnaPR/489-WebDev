const { Sequelize } = require('sequelize')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database/biteawaydb.sqlite'
})

sequelize.authenticate()
.then(() => {
  console.log('Connection to the database has been established successfully.');
})
.catch((err) => {
  console.error('Unable to connect to the database:', err);
});

// attempting to fix circular dependency errors: https://stackoverflow.com/questions/45079710/sequelize-associate-not-executing-from-index-js
// keeping source in case; import models and associations here if needed

// module.exports = {
//   sequelize,
//   User,
//   Cuisine,
//   Item,
//   Order,
//   Restaurant,
//   Review,
//   Cart
// };

module.exports = sequelize