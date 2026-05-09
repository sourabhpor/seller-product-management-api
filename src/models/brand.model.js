const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const Brand = sequelize.define(
  "Brand",
  {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    brandName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    detail: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "brands",
    timestamps: true,
  },
);

module.exports = Brand;
