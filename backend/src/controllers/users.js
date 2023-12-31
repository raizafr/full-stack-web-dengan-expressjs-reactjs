import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../models/Users.js";
import nodemailer from "nodemailer";
import speakeasy from "speakeasy";
import fs from "fs";
// controller getdata user
export const getUser = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await Users.findByPk(userId);

    delete user.dataValues.password;
    res.status(200).json({
      message: "Get data user",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller register
export const register = async (req, res) => {
  const { firstName, lastName, username, email, password, confirmPassword } =
    req.body;
  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ message: "bad request" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "passwords are not the same" });
  }
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
    const existingUser = await Users.findOne({ where: { email: email } });
    if (existingUser) {
      return res.status(400).json({ message: `${email} already exist` });
    }
    const otpCode = speakeasy.totp({
      secret: speakeasy.generateSecret().base32,
      encoding: "base32",
    });
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: `"Testing Acount" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Confirm Email",
      text: `Kode Otp Adalah: ${otpCode}`,
    };
    transporter.sendMail(mailOptions, (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);
      }
    });

    await Users.create({
      firstName,
      lastName,
      username,
      email,
      password: hashPassword,
      otpCode,
      otpConfirmed: false,
    });
    res.status(201).json({
      message: "OTP code has been sent to your email",
      email,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "internal server error" });
  }
};

// controler verify otp
export const verifyOtp = async (req, res, next) => {
  const { email, otpCode } = req.body;
  console.log(otpCode);
  if (!email || !otpCode) {
    return res.status(400).json({ message: "bad request" });
  }

  try {
    const user = await Users.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (otpCode != user.dataValues.otpCode) {
      return res.status(400).json({ message: "Invalid OTP code" });
    }
    await Users.update(
      { otpConfirmed: true },
      {
        where: {
          email,
        },
      }
    );

    res.status(200).json({ message: "success register" });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
};

// controller login
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ message: "Blank email" });
  if (!password) return res.status(400).json({ message: "Blank password" });
  try {
    const user = await Users.findOne({ where: { email: email } });
    if (!user) return res.status(404).json({ message: "Email not found" });
    if (!user.dataValues.otpConfirmed) {
      return res.status(400).json({ message: "Email has not been verified" });
    }

    const comparePassword = await bcrypt.compare(
      password,
      user.dataValues.password
    );

    if (!comparePassword) {
      return res.status(404).json({ message: "Wrong password" });
    }

    const id = user.dataValues.id;
    const accessToken = jwt.sign(
      {
        id,
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

// controller editUser

export const editUserProfile = async (req, res, next) => {
  const { firstName, lastName, username, email } = req.body;

  let imageName = null;
  let imageUrl = null;

  const userId = req.userId;
  if (!firstName || !lastName || !username || !email) {
    return res.status(400).json({ message: "bad request" });
  }
  try {
    const user = await Users.findByPk(userId);
    console.log(user);
    if (req.file) {
      imageName = req.file.filename;
      imageUrl = `${process.env.HOSTNAME}/${req.file.path}`;
      fs.unlink(`public/images/${user.dataValues.imageName}`, (err) => {});
    } else {
      imageName = user.dataValues.imageName;
      imageUrl = user.dataValues.imageUrl;
    }

    if (!user) return res.status(404).json({ message: "user not found" });
    await user.update({
      firstName,
      lastName,
      username,
      imageName,
      imageUrl,
      email,
    });
    res.status(200).json({ message: "Profile updated" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller change password
export const changeUserPassword = async (req, res) => {
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  const userId = req.userId;
  try {
    const user = await Users.findByPk(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const comparePassword = await bcrypt.compare(
      currentPassword,
      user.dataValues.password
    );

    if (!comparePassword) {
      return res
        .status(400)
        .json({ message: "The current password is incorrect" });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ message: "passwords are not the same" });
    }

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(newPassword, salt);
    await user.update({
      password: hashPassword,
    });
    res.status(200).json({ message: "Password changed" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller logout
export const logout = (req, res) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "logout success" });
};
