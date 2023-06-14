import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../model/Users.js";

// controller getdata user
export const getUser = async (req, res) => {
  try {
    const auth = req.headers.authorization;
    console.log(auth);
    const userId = req.userId;
    let user = await Users.findOne({ where: { user_id: userId } });
    delete user.password;
    res.status(200).json({
      message: "Get data user",
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      is_active: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller register
export const register = async (req, res) => {
  const { username, email, password, confirm_password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "bad request" });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ message: "passwords are not the same" });
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const insertUser = await Users.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    res.status(201).json({
      message: "Register Success",
      username: insertUser.username,
      email: insertUser.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Email already registered" });
  }
};

// controller login
export const login = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });

    const comparePassword = await bcrypt.compare(
      req.body.password,
      user.dataValues.password
    );
    if (!comparePassword) {
      return res.status(404).json({ message: "Wrong password" });
    }
    const userId = user.dataValues.user_id;
    const accessToken = jwt.sign(
      {
        userId,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );
    res
      .cookie("access_token", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: "login success", session: accessToken });
  } catch (err) {
    console.log(err);
  }
};

// controller logout
export const logout = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "logout success" });
};
