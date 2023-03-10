// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');

// import our database connection from config.js
const sequelize = require('../config/connection.js');

// initialize tag model (table) by extending off sequelize's model class
class Tag extends Model {}

// set up fields and rules for tag model

Tag.init(
  {
    // define the id field as an integer primary key that auto-increments
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // define the tag_name field as a non-null string
    tag_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    // define the metadata for the tag model
    sequelize,  // Use the sequelize connection object
    timestamps: false,  // Don't include timestamp fields
    freezeTableName: true,  // Use the model name as the table name
    underscored: true,  // Use snake_case for column names
    modelName: 'tag',  // Use the name 'tag' for the model
  }
);


// Tag.init(
//   {
//     // define columns
//   },
//   {
//     sequelize,
//     timestamps: false,
//     freezeTableName: true,
//     underscored: true,
//     modelName: 'tag',
//   }
// );

// define many-to-many association with product model
const Product = require('./product.js');
Tag.belongsToMany(Product, {
  through: 'product_tag',
  foreignKey: 'tag_id'
});

// export the tag model for use in other parts of the application
module.exports = Tag;
