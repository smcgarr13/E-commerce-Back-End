// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

const Category = require('./category');

// initialize product model (table) by extending off sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model

Product.init(
  {
    // define the id field as an integer primary key that auto-increments
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // define the product_name field as a non-null string
    product_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // define the price field as a non-null decimal
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
      },
    },
    // define the stock field as a non-null integer with a default value of 10
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 10,
      validate: {
        isNumeric: true,
      },
    },
    // define the category_id field as an integer that references the category model's id
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id',
      },
    },
  },
  {
    // define the metadata for the product model
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

// Product.init(
//   {
//     // define columns
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'product',
//   }
// );

// define a relationship between the Product and Category models
Product.belongsTo(Category, {
  foreignKey: 'category_id', // the foreign key for the relationship
});

// export the product model for use in other parts of the application
module.exports = Product;
