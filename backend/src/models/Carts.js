import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Users from "./Users.js";
import Products from "./Products.js";
const Carts = db.define(
  "Carts",
  {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productImageName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productImageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pricePerProduct: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    tableName: "Carts",
  }
);

Carts.belongsTo(Users, { foreignKey: "userId" });
Carts.belongsTo(Products, { foreignKey: "productId" });

export default Carts;
