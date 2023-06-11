const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("./src/routes/index");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(router);

app.listen(3000, () => console.log("server running at port 3000"));
