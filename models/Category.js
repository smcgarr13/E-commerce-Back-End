// import necessary modules
const { Model, DataTypes } = require('sequelize');

// import database connection object
const sequelize = require('../config/connection.js');

const Product = require('./product');

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

// Category.init(
//   {
//     // define columns
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'category',
//   }
// );

// define a relationship between the Category and Product models
Category.hasMany(Product, {
  foreignKey: 'category_id', // the foreign key for the relationship
});

// export the category model for use in other parts of the application
module.exports = Category;
