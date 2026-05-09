const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/database");

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      //   unique: true,
    },

    mobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    skills: {
      type: DataTypes.JSON,
      allowNull: true,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM("ADMIN", "SELLER"),
      allowNull: false,
    },
  },
  {
    tableName: "users",
    timestamps: true,
  },
);

module.exports = User;
