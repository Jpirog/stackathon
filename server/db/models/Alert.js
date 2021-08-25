const { 
  STRING,
  DECIMAL,
  INTEGER,
  DATE,
  UUID, 
  UUIDV4
} = require('sequelize');
const db = require('../db')

const Alert = db.define('alert',{
  name: {
    type: STRING,
    required: true,
    allowNull: false,
    unique: true
  },
  description: {
    type: STRING(1000),
    allowNull: false,
    required: true,
    unique: false,
    validate: { notEmpty: true },
  },
})

module.exports = Alert ;