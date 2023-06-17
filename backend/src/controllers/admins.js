import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admins from "../model/Admins.js";

// controller getdata admin
export const getAdmin = async (req, res) => {
  try {
    const adminId = req.adminId;
    console.log(adminId);
    let admin = await Admins.findOne({ where: { admin_id: adminId } });
    delete admin.password;
    res.status(200).json({
      message: "Get data user",
      admin_id: admin.admin_id,
      username: admin.username,
      email: admin.email,
      is_active: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller register admin
export const registerAdmin = async (req, res) => {
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
    const getAdmin = await Users.findOne({ where: { email: email } });
    if (getAdmin) {
      return res.status(400).json({ message: `${email} alredy exist` });
    }
    const insertAdmin = await Admins.create({
      username: username,
      email: email,
      password: hashPassword,
    });
    res.status(201).json({
      message: "Register Success",
      username: insertAdmin.username,
      email: insertAdmin.email,
    });
  } catch (err) {
    res.status(500).json({ message: "Email already registered" });
  }
};

// controller login admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: "Blank email" });
  if (!password) return res.status(400).json({ message: "Blank password" });
  try {
    const admin = await Admins.findOne({ where: { email: email } });
    if (!admin) return res.status(404).json({ message: "Email not found" });
    const comparePassword = await bcrypt.compare(
      password,
      admin.dataValues.password
    );
    if (!comparePassword) {
      return res.status(404).json({ message: "Wrong password" });
    }
    const adminId = admin.dataValues.admin_id;
    const accessToken = jwt.sign(
      {
        adminId,
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
export const logoutAdmin = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "logout success" });
};
