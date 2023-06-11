const mysql = require("mysql");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "e-commerce",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connect to database");
});

module.exports = db;
