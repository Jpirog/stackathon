const { 
  STRING,
  DECIMAL,
  INTEGER,
  DATE,
  JSON, 
  UUIDV4
} = require('sequelize');
const db = require('../db')

const Alert = db.define('alert',{
  source: {
    type: STRING,
    required: true,
    allowNull: false,
    unique: false,
  },
  sourceId: {
    type: STRING,
    required: false,
    allowNull: true,
    unique: false,
  },
  timeReceived: {
    type: DATE,
    required: true,
    allowNull: false,
    unique: false,
  },
  description: {
    type: STRING(2000),
    allowNull: false,
    required: true,
    unique: false,
    validate: { notEmpty: true },
  },
  appropriateness: {
    type: JSON,
    allowNull: true,
    required: false,
    unique: false,
  },
}, {
  indexes: [
      {
          unique: true,
          fields: ['source', 'sourceId'],
      }
  ]
}
)

module.exports = Alert ;