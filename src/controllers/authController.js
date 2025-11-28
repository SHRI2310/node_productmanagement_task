const { validationResult } = require('express-validator');
const User = require('../models/User');
const { signToken } = require('../utils/jwt');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { name, email, password, phone } = req.body;
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) return res.status(409).json({ message: 'Email already in use' });

  const user = new User({ name, email: email.toLowerCase(), password, phone, role: 'user' });
  await user.save();
  const token = signToken({ id: user._id, role: user.role });
  res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(422).json({ errors: errors.array() });

  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  const token = signToken({ id: user._id, role: user.role });
  res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token });
};
