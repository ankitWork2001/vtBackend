import {UserModel} from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Signup
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !password) {
      return res.json({ message: "All fields are required", success: false });
    }

    if (password.length < 6) {
      return res.json({ message: "Password length should be more than 6", success: false });
    }

    const oldUser = await UserModel.findOne({ email });
    if (oldUser) {
      return res.json({ message: "Email is already registered", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await UserModel.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
    });

    res.status(201).json({ message: "User registered successfully", success: true, newUser });
  } catch (error) {
    res.status(500).json({ message: error.message || "Signup failed", success: false });
  }
};

//Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({ message: "Email and password are required", success: false });
    }

    if (!email.includes("@") || !email.includes(".") || email.startsWith("@") || email.endsWith("@")) {
      return res.json({ message: "Invalid email format", success: false });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.json({ message: "No user found with this email", success: false });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ message: "Incorrect password", success: false });
    }

    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("itoken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message || "Login failed", success: false });
  }
};

//Logout
export const logout = (req, res) => {
  try {
    res.clearCookie("itoken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    });

    res.json({ message: "Logged out successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: error.message || "Logout failed", success: false });
  }
};
