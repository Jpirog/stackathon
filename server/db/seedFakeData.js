//const faker = require('faker');
const User = require('./models/User')
const Alert = require('./models/Alert')
const db = require('./db');
  
const seedFakeData = async (nbrUsers = 5, nbrAlerts = 25) => {
  await db.sync({force: true});

  const userUsernames = [];
  const user = await User.create({
    email: "jpirog@hotmail.com", 
    name: 'John Pirog',
    username: 'johnpirog262',
    mobilePhone: '8475140345',
    subscribed: true
  })

}

module.exports = seedFakeData;
