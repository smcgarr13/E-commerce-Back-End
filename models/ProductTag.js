// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

// import our database connection from config.js
const sequelize = require('../config/connection');

// initialize ProductTag model (table) by extending off sequelize's model class
class ProductTag extends Model {}


// set up fields and rules for ProductTag model
ProductTag.init(
  {
    // define the id field as an integer primary key that auto-increments
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // define the product_id field as an integer that references the product model's id
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
      },
    },
    // define the tag_id field as an integer that references the tag model's id
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'tag',
        key: 'id',
      },
    },
  },
  {
    // define the metadata for the ProductTag model
    sequelize, // Use the sequelize connection object
    timestamps: false, // Don't include timestamp fields
    freezeTableName: true, // Use the model name as the table name
    underscored: true, // Use snake_case for column names
    modelName: 'product_tag',  // Use the name 'product_tag' for the model
  }
);

// export the ProductTag model for use in other parts of the application
module.exports = ProductTag;
