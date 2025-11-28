const { validationResult } = require('express-validator');
const Product = require('../models/Product');

exports.createProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { name, description, price, stock, sku, category, tags, images } = req.body;
  const existing = await Product.findOne({ sku });
  if (existing) return res.status(409).json({ message: 'SKU must be unique' });

  const product = new Product({ name, description, price, stock, sku, category, tags, images });
  await product.save();
  res.status(201).json({ product });
};

exports.updateProduct = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { id } = req.params;
  const update = req.body;
  const product = await Product.findByIdAndUpdate(id, update, { new: true });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ product });
};

exports.getProducts = async (req, res) => {
  const { q, category, page = 1, limit = 10, sort = 'createdAt' } = req.query;
  const filter = { isActive: true };
  if (q) filter.$or = [{ name: new RegExp(q, 'i') }, { description: new RegExp(q, 'i') }];
  if (category) filter.category = category;
  const skip = (Number(page) - 1) * Number(limit);
  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter).sort({ [sort]: -1 }).skip(skip).limit(Number(limit));
  res.json({ page: Number(page), total, products });
};

exports.getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ product });
};
