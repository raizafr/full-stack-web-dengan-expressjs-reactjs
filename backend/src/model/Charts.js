import { DataTypes } from "sequelize";
import db from "../config/database.js";
import Users from "./Users.js";
import Products from "./Products.js";
const Charts = db.define(
  "Charts",
  {
    chartId: {
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
    tableName: "Charts",
  }
);

Charts.belongsTo(Users, { foreignKey: "userId" });
Charts.belongsTo(Products, { foreignKey: "productId" });

export default Charts;
