import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  description: String,
  start: Date,
  end: Date,
  status: { type: String, enum: ["active", "cancelled", "completed"], default: "active" },
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin" },
}, { timestamps: true });

export const EventModel = mongoose.model("Event", eventSchema);
