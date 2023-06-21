import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Users from "../model/Users.js";
import nodemailer from "nodemailer";
import speakeasy from "speakeasy";

// controller getdata user
export const getUser = async (req, res) => {
  try {
    const userId = req.userId;
    let user = await Users.findOne({ where: { userId: userId } });
    delete user.password;
    res.status(200).json({
      message: "Get data user",
      userId: user.userId,
      username: user.username,
      email: user.email,
      isActive: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// controller register
export const register = async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  if (!username || !email || !password) {
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
    res.status(500).json({ message: "internal server error" });
  }
};

// controler verify otp
export const verifyOtp = async (req, res) => {
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

    const userId = user.dataValues.userId;
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
