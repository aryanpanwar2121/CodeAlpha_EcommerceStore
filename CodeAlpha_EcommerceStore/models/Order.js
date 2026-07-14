const mongoose = require("mongoose");
module.exports = mongoose.model("Order", new mongoose.Schema({
  userId: String,
  customerName: String,
  items: Array,
  total: Number,
  status: { type: String, default: "Order Placed" },
  createdAt: { type: Date, default: Date.now }
}));