import express from "express";
import db from "./src/config/database.js";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import router from "./src/routes/index.js";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use("/public", express.static(path.join(__dirname, "public")));
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
