import {AddtoCartmodel} from "../models/AddToCart.js"


// Add an item to cart
export const addToCart = async (req, res) => {

  try {

    const { userId, serviceId, quantity, price } = req.body;

    if (!userId || !serviceId || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if item already exists
    const existing = await AddtoCartmodel.findOne({ userId, serviceId });

    if (existing) {

      existing.quantity += quantity || 1;
      const updatedItem = await existing.save();
      return res.status(200).json({ message: "Cart updated", data: updatedItem });
      
    }

    const newItem = new AddtoCartmodel({ userId, serviceId, quantity, price });
    const saved = await newItem.save();
    res.status(201).json({ message: "Item added to cart", data: saved });

  } 
catch (error) {
    
    res.status(500).json({ message: "Error adding item to cart", error });
  }
};



// Get user's cart
export const getCart = async (req, res) => {

  try {

    const { userId } = req.query;
    const cart = await AddtoCartmodel.find({ userId }).populate('serviceId');
    res.status(200).json({ message: "Cart fetched", data: cart });

  } 
  catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// Update quantity or product
export const updateCartItem = async (req, res) => {
  try {
    const { userId, serviceId, quantity } = req.body;

    const item = await AddtoCartmodel.findOne({ userId, serviceId });

    if (!item) return res.status(404).json({ message: "Item not found in cart" });

    item.quantity = quantity;
    const updated = await item.save();

    res.status(200).json({ message: "Item updated", data: updated });
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error });
  }
};

// Remove specific product
export const removeCartItem = async (req, res) => {
  try {
    const { userId } = req.query;
    const { productId } = req.params;

    await AddtoCartmodel.deleteOne({ userId, serviceId: productId });

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(500).json({ message: "Error removing item", error });
  }
};

// Clear entire cart
export const clearCart = async (req, res) => {
  try {
    const { userId } = req.query;

    await AddtoCartmodel.deleteMany({ userId });

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
};