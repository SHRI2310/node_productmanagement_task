const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const orderController = require('../controllers/orderController');
const { placeOrderValidator } = require('../validators/orderValidators');

router.post('/', auth, placeOrderValidator, orderController.placeOrder);
router.get('/usersorder', auth, orderController.getUserOrders);
router.get('/:id', auth, orderController.getOrderById);

module.exports = router;
