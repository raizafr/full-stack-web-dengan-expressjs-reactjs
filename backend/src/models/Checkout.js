import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Checkout = db.define(
  "Checkout",
  {
    product: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bank: {
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
    totalPrice: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "Checkout",
  }
);

export default Checkout;
