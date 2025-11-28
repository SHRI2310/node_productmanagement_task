const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const auth = require('../middlewares/auth');
const requireRole = require('../middlewares/role');
const { createProductValidator, updateProductValidator } = require('../validators/productValidators');

// Public product list & get
router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);

// Admin only product create/update
router.post('/', auth, requireRole('admin'), createProductValidator, productController.createProduct);
router.put('/:id', auth, requireRole('admin'), updateProductValidator, productController.updateProduct);

module.exports = router;
