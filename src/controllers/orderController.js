const { validationResult } = require('express-validator');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const Order = require('../models/Order');

exports.placeOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { items, shippingAddress } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    // Build items with snapshots and decrement stock atomically
    const populatedItems = [];
    let totalAmount = 0;

    for (const it of items) {
      const prod = await Product.findOne({ _id: it.productId }).session(session);
      if (!prod) {
        throw { status: 404, message: `Product not found: ${it.productId}` };
      }
      if (prod.stock < it.quantity) {
        throw { status: 400, message: `Insufficient stock for product ${prod.name}` };
      }
      // decrement
      prod.stock = prod.stock - it.quantity;
      await prod.save({ session });
      const snapshot = { product: prod._id, name: prod.name, price: prod.price, quantity: it.quantity };
      populatedItems.push(snapshot);
      totalAmount += prod.price * it.quantity;
    }

    const order = new Order({
      user: req.user._id,
      items: populatedItems,
      totalAmount,
      shippingAddress
    });

    await order.save({ session });
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({ order });
  } catch (err) {
    await session.abortTransaction().catch(() => {});
    session.endSession();
    const status = err.status || 500;
    return res.status(status).json({ message: err.message || 'Failed to place order' });
  }
};

exports.getUserOrders = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const total = await Order.countDocuments({ user: req.user._id });
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 }).skip(skip).limit(Number(limit));
  res.json({ page: Number(page), total, orders });
};

exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id).populate('items.product');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  // ensure ownership or admin check done by route
  res.json({ order });
};
