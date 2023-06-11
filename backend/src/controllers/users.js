const db = require("../config/database");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// controller getdata user
const getUser = (req, res) => {
  const userId = req.userId;
  db.query("SELECT * FROM users WHERE user_id=?", userId, (err, results) => {
    if (err) {
      res.status(500).json({ massage: "internal server error" });
    } else {
      delete results[0].password;
      res.status(200).json({ massage: "get data success", data: results[0] });
    }
  });
};

// controller register
const register = (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400).json({ massage: "bad request" });
  } else {
    bcrypt.hash(password, 10, (err, hashedPasswrd) => {
      if (err) {
        res.status(500).json({
          massage: "internal server error",
        });
      } else {
        const newUser = {
          username,
          email,
          password: hashedPasswrd,
        };
        const insertUser = "INSERT INTO users SET ?";
        db.query(insertUser, newUser, (err) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              res
                .status(409)
                .json({ massage: `email ${email} already exists` });
            } else {
              res.status(500).json({ massage: "internal server error" });
            }
          } else {
            res.status(201).json({
              massage: "register succes",
              data: { username: username, email: email },
            }).cookie;
          }
        });
      }
    });
  }
};

// controller login

const login = (req, res) => {
  const { email, password } = req.body;
  db.query("SELECT * FROM users WHERE email=?", email, (err, results) => {
    if (err) {
      res.status(500).json({ massage: "internal server error" });
    } else {
      if (results === 0) {
        res.status(401).json({ massage: "invalid credentials" });
      } else {
        const user = results[0];

        bcrypt.compare(password, user.password, (err, match) => {
          if (err) {
            res.status(500).json({ massage: "bad requst" });
          } else if (!match) {
            res.status(401).json({ massage: "invalid credential" });
          } else {
            const accessToken = jwt.sign(
              {
                userId: user.user_id,
                email: user.email,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: "2h",
              }
            );
            res
              .cookie("accessToken", accessToken, {
                httpOnly: true,
                maxAge: 24 * 60 * 60 * 1000,
              })
              .json({ access_token: accessToken });
          }
        });
      }
    }
  });
};

// controller logout
const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ massage: "logout success" });
};

module.exports = { register, login, getUser, logout };
