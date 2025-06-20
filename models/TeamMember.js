import mongoose from "mongoose";

const teamMemberSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phoneNumber: { type: String, required: true },
  position: { type: String, required: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  photoUrl: { type: String }, 
}, { timestamps: true });

export const TeamMember = mongoose.model("TeamMember", teamMemberSchema);
