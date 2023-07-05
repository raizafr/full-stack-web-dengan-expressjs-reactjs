import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Orders = db.define(
  "Orders",
  {
    price: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    responseMidtrans: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "Orders",
  }
);

export default Orders;
