const db = require("./db");

const Alert = require("./models/Alert");
const User = require("./models/User");
const seedFakeData = require("./seedFakeData");

const seedDB = async () => {
  await db.sync({ force: true });
  await seedFakeData();
};

module.exports = {
  seedDB,
  db,
  User,
  Alert,
  };
