const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/role');
const adminController = require('../controllers/adminController');
const productController = require('../controllers/productController');

// All routes here require admin role
router.use(auth, requireRole('admin'));

// Orders
router.get('/orders', adminController.getAllOrders);

// You can also reuse product creation/updation via /api/products routes (they are protected)
module.exports = router;
