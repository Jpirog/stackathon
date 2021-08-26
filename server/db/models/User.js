const { 
  STRING,
  DECIMAL,
  INTEGER,
  DATE,
  UUID, 
  UUIDV4,
  BOOLEAN
} = require('sequelize');
const db = require('../db')

const User = db.define('user',{
  name: {
    type: STRING,
    required: true,
    allowNull: false,
    unique: false
  },
  email: {
    type: STRING,
    required: true,
    allowNull: false,
    unique: true
  },
  username: {
    type: STRING,
    required: true,
    allowNull: false,
    unique: true
  },
  mobilePhone: {
    type: STRING,
    allowNull: true,
    required: false,
    unique: true,
  },
  subscribed: {
    type: BOOLEAN,
    allowNull: false,
    required: true,
    unique: false,
    defaultValue: false
  },
})

module.exports = User ;