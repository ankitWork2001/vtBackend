
import mongoose from "mongoose";


const cartItemSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  serviceId: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
  quantity: { type: Number, default: 1 },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});


export const AddtoCartmodel = mongoose.model("CartItem", cartItemSchema);

