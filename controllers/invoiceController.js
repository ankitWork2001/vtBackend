import mongoose from "mongoose";
import { InvoiceModel } from "../models/Invoice.js";

// GET /api/invoices/:invoiceId - fetch specific invoice
export const getInvoiceById = async (req, res) => {
  const { invoiceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
    return res.status(400).json({ message: "Invalid invoice ID" });
  }

  try {
    const invoice = await InvoiceModel.findById(invoiceId);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// POST /api/invoices (Admin/manual usage only)
export const createInvoice = async (req, res) => {
  try {
    const newInvoice = new InvoiceModel(req.body);
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (err) {
    res.status(400).json({ message: "Invalid invoice data", error: err.message });
  }
};

// Internal: Generate invoice from an order
export const createInvoiceFromOrder = async (order, user, pickupInfo) => {
  try {
    const invoiceNumber = `INV-${Date.now()}`;

    const items = order.services.map(service => ({
      description: service.serviceName,
      quantity: service.quantity,
      unitPrice: service.unitPrice,
      totalItemPrice: service.totalItemPrice
    }));

    const taxRate = 0.18;
    const taxAmount = order.subTotal * taxRate;
    const totalAmount = order.subTotal + taxAmount - order.discountAmount;

    const invoice = new InvoiceModel({
      invoiceNumber,
      status: order.paymentStatus === "Paid" ? "paid" : "pending",
      from: {
        companyName: "LaundryX Pvt. Ltd.",
        address: "123 Main Street, City"
      },
      to: {
        userId: user._id,
        customerName: `${user.firstName} ${user.lastName}`,
        customerAddress: pickupInfo?.address || "N/A",
        customerEmail: user.email
      },
      items,
      subTotal: order.subTotal,
      taxRate,
      taxAmount,
      discountAmount: order.discountAmount,
      totalAmount,
      relatedOrderId: order._id
    });

    const savedInvoice = await invoice.save();
    return savedInvoice;

  } catch (error) {
    console.error("Invoice creation failed:", error);
    throw new Error("Invoice creation error");
  }
};

// PUT /api/invoices/:invoiceId - update an invoice
export const updateInvoice = async (req, res) => {
  const { invoiceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
    return res.status(400).json({ message: "Invalid invoice ID" });
  }

  try {
    const updated = await InvoiceModel.findByIdAndUpdate(invoiceId, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Invoice not found" });

    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update failed", error: err.message });
  }
};

// POST /api/invoices/:invoiceId/send - simulate sending invoice
export const sendInvoice = async (req, res) => {
  const { invoiceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
    return res.status(400).json({ message: "Invalid invoice ID" });
  }

  try {
    const invoice = await InvoiceModel.findById(invoiceId);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    invoice.sentToCustomer = true;
    invoice.sentDate = new Date();
    await invoice.save();

    res.json({ message: "Invoice sent successfully", invoice });
  } catch (err) {
    res.status(500).json({ message: "Sending failed", error: err.message });
  }
};

// GET /api/invoices/:invoiceId/download - simulate download
export const downloadInvoice = async (req, res) => {
  const { invoiceId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(invoiceId)) {
    return res.status(400).json({ message: "Invalid invoice ID" });
  }

  try {
    const invoice = await InvoiceModel.findById(invoiceId);
    if (!invoice) return res.status(404).json({ message: "Invoice not found" });

    res.setHeader("Content-Disposition", "attachment; filename=invoice.json");
    res.json(invoice);
  } catch (err) {
    res.status(500).json({ message: "Download failed", error: err.message });
  }
};
