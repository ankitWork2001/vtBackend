const mongoose = require("mongoose");

const pickupInfoSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fullName: String,
  addressTitle: String,
  address: String,
  landmark: String,
  pickupDate: Date,
  pickupTimeSlot: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PickupInfo", pickupInfoSchema);
