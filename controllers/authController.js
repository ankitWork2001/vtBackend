import { UserModel } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

//Signup
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, username, role, email, phone, password } = req.body;

    // Basic validations
    if (!firstName || !lastName || !username || !role || !email || !phone || !password) {
      return res.status(400).json({ message: "All fields are required", success: false });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long", success: false });
    }

    // Check duplicate email
    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return res.status(409).json({ message: "Email is already registered", success: false });
    }

    // Check duplicate username
    const oldUsername = await UserModel.findOne({ username });
    if (oldUsername) {
      return res.status(409).json({ message: "Username is already taken", success: false });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = await UserModel.create({
      firstName,
      lastName,
      username,
      role,
      email,
      phone,
      password: hashedPassword,
    });

    // Remove password before sending
    const userResponse = { ...newUser._doc };
    delete userResponse.password;

    res.status(201).json({ message: "User registered successfully", success: true, user: userResponse });
  } catch (error) {
    res.status(500).json({ message: error.message || "Signup failed", success: false });
  }
};





export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Email and password are required" });
    }

    // simple email validation
    if (!email.includes("@") || !email.includes(".")) {
      return res.status(400).json({ success: false, message: "Invalid email format" });
    }

    // check user
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "No user found with this email" });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Incorrect password" });
    }

    // generate token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // set cookie (secure = false for local testing)
    res.cookie("itoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful..... ",
      // token,
      // user: {
      //   id: user._id,
      //   email: user.email,
      //   role: user.role,
      // },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Login failed" });
  }
};

// ---------------- LOGOUT ----------------
export const logout = (req, res) => {
  try {
    res.clearCookie("itoken", {
      httpOnly: true,
      secure: false, //must also be false locally
      sameSite: "strict",
      path: "/",
    });

    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Logout failed" });
  }
};


export const authME = (req, res) => {
  const token = req.cookies.itoken; // read from cookie
  if (!token) return res.status(401).json({ msg: "Not logged in from user" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.id);
    res.json({ user: decoded });
  } catch (err) {
    console.log(err)
    res.status(401).json({ msg: "Invalid token" });
  }
}

