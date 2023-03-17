// import necessary modules
const { Model, DataTypes } = require('sequelize');

// import database connection object
const sequelize = require('../config/connection.js');

// const Product = require('./Product');

// define the category model as a subclass of sequelize's model class
class Category extends Model {}

// initialize the category model with the required fields
Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // use the sequelize connection object
    timestamps: false, // don't include timestamp fields
    freezeTableName: true, // use the model name as the table name
    underscored: true, // use snake_case for column names
    modelName: 'category', // use the name 'category' for the model
  }
);

// export the category model for use in other parts of the application
module.exports = Category;
