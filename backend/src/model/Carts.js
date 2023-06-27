import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Users from "./Users.js";
import Products from "./Products.js";
const Carts = db.define(
  "Carts",
  {
    cartId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
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
