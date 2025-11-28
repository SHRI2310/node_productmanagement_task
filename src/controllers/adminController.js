const { validationResult } = require('express-validator');
const Product = require('../models/Product');
const Order = require('../models/Order');

// Admin: view all orders with optional filters
exports.getAllOrders = async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;
  const skip = (Number(page) - 1) * Number(limit);
  const total = await Order.countDocuments(filter);
  const orders = await Order.find(filter).sort({ createdAt: -1 }).skip(skip).limit(Number(limit)).populate('user', 'name email');
  res.json({ page: Number(page), total, orders });
};


