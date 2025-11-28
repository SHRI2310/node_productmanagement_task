const jwtUtils = require('../utils/jwt');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization') || '';
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;
    if (!token) return res.status(401).json({ message: 'Unauthorized - token missing' });

    const decoded = jwtUtils.verifyToken(token);
    const user = await User.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: 'Unauthorized - user not found' });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Unauthorized - invalid token', error: err.message });
  }
};

module.exports = auth;
