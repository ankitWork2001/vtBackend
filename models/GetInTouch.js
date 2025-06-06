
import mongoose from "mongoose";


const getInTouchSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  topic: String,
  message: String,
  agreeToTerms: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});


export const GetInTouchModel = mongoose.model("GetInTouch", getInTouchSchema);

