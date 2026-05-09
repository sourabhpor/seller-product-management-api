const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Product = sequelize.define(
  "Product",
  {
    sellerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    productDescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "products",

    timestamps: true,
  },
);

module.exports = Product;
