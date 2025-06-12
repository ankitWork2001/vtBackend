import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
import { DB_NAME } from "../constants.js";


const connectDB = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.DATABASE_URI}/${DB_NAME}`);
    console.log(`MongoDB connected successfully!! DB host: ${connectionInstance.connection.host}, DB name: ${connectionInstance.connection.name}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}

export default connectDB;