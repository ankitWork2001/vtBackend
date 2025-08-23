import {UserModel} from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()

//Signup
export const signup = async (req, res) => {
  try {
    const { firstName, lastName, username, role, email, phone, password } = req.body;

    if (!firstName || !lastName || !username || !role || !email || !phone || !password) {
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
      username,
      role,
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
// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.json({ message: "Email and password are required", success: false });
//     }

//     if (!email.includes("@") || !email.includes(".") || email.startsWith("@") || email.endsWith("@")) {
//       return res.json({ message: "Invalid email format", success: false });
//     }

//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.json({ message: "No user found with this email", success: false });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.json({ message: "Incorrect password", success: false });
//     }

//     const token = jwt.sign(
//       { id: user._id, email: user.email, role: user.role },
//       process.env.JWT_SECRET,
//       { expiresIn: "24h" }
//     );

//     res.cookie("itoken", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//       maxAge: 24* 60 * 60 * 1000,
//       path:"/"
//     });

//     res.status(200).json({
//       message: "Login successful",
//       success: true,
//       token,
//       user,
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message || "Login failed", success: false });
//   }
// };

// //Logout
// export const logout = (req, res) => {
//   try {
//     res.clearCookie("itoken", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
//       path:"/"
//     });

//     res.json({ message: "Logged out successfully", success: true });
//   } catch (error) {
//     res.status(500).json({ message: error.message || "Logout failed", success: false });
//   }
// };


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

    // set cookie (⚠️ secure = false for local testing)
    res.cookie("itoken", token, {
      httpOnly: true,
      secure: false, // ✅ use false for localhost
      sameSite: "lax",
      maxAge: 24 * 60 * 60 * 1000,
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
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
      secure: false, // ✅ must also be false locally
      sameSite: "lax",
      path: "/",
    });

    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message || "Logout failed" });
  }
};

