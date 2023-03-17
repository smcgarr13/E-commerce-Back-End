// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// products belongsTo category
Product.belongsTo(Category, {
  foreignKey: {
    allowNull: false,
    name: 'category_id'
  }
});

// categories have many products
Category.hasMany(Product, {
  onDelete: 'CASCADE'
});

// products belongToMany tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  foreignKey: 'product_id'
});

// tags belongToMany products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  foreignKey: 'tag_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
