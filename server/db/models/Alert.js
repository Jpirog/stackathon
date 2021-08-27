const { 
  STRING,
  DECIMAL,
  INTEGER,
  DATE,
  JSON, 
  UUID,
  UUIDV4,
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
  seq: {
    type: UUID,
    defaultValue: UUIDV4,
    required: true,
    allowNull: false,
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
    defaultValue: {"status":"success","request":{"id":"req_aguyacBY3cHDGR0cWCgmI","timestamp":1630029525.10108,"operations":1},"profanity":{"matches":[]},"personal":{"matches":[]},"link":{"matches":[]}},
  },
  sentiment: {
    type: JSON,
    allowNull: true,
    required: false,
    unique: false,
    defaultValue: {"id":"08564b41-9b38-4a4a-9b80-3cb4d7d52553","output":["Neutral"]},
  },
  textStatus: {
    type: STRING,
    allowNull: true,
    required: false,
    unique: false,
  },
}, {
  indexes: [
      {
          unique: true,
          fields: ['source', 'sourceId', 'seq'],
      }
  ]
}
)

module.exports = Alert ;