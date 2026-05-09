const User = require("./user.model");
const Product = require("./product.model");
const Brand = require("./brand.model");

// USER -> PRODUCT

User.hasMany(Product, {
  foreignKey: "sellerId",
});

Product.belongsTo(User, {
  foreignKey: "sellerId",
});

// PRODUCT -> BRAND

Product.hasMany(Brand, {
  foreignKey: "productId",
});

Brand.belongsTo(Product, {
  foreignKey: "productId",
});

const syncModels = async () => {
  await User.sync({ alter: true });

  await Product.sync({ alter: true });

  await Brand.sync({ alter: true });

  console.log("All Models Synced");
};

module.exports = {
  User,
  Product,
  Brand,
  syncModels,
};
