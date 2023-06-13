import express from "express";
import db from "./src/config/database.js";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import router from "./src/routes/index.js";

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);

const syncDatabase = async () => {
  try {
    await db.sync({ force: false });
    console.log("Connection has been established successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
syncDatabase();

app.listen(3000, () => console.log("server running at port 3000"));
