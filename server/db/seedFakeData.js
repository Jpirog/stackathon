//const faker = require('faker');
const User = require('./models/User')
const Alert = require('./models/Alert')
const db = require('./db');
  
const seedFakeData = async (nbrUsers = 5, nbrAlerts = 25) => {
  await db.sync({force: true});

  const userUsernames = [];
  const user = await User.create({name: "jpirog@hotmail.com", description: 'John Pirog'})

}

module.exports = seedFakeData;
