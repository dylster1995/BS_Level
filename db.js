const Sequelize = require("sequelize");
require('dotenv').config()

const sequelize = new Sequelize(
 DB_TABLE,
 DB_USER,
 DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'mysql',
    dialectOptions: {
        useUTC: false, //for reading from database
        dateStrings: true,
        typeCast: function (field, next) { // for reading from database
          if (field.type === 'DATETIME') {
            return field.string()
          }
            return next()
          },
      },
    timezone: '-07:00'
  }
);

module.exports = sequelize;