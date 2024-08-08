const { Sequelize, DataTypes, INTEGER } = require("sequelize");
const sequelize = require('../db');


 
 sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');

 }).catch((error) => {
    console.error('Unable to connect to the database: ', error);
 });

 const Reading = sequelize.define("readings", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    bloodsugar: {
      type: DataTypes.INTEGER,
      allowNull: false,
    }
 });

 sequelize.sync().then(() => {
    console.log('Reading table created successfully!');
 }).catch((error) => {
    console.error('Unable to create table : ', error);
 });

 module.exports = Reading;