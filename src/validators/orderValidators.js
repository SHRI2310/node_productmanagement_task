const { body } = require('express-validator');

const placeOrderValidator = [
  body('items').isArray({ min: 1 }).withMessage('At least one item required'),
  body('items.*.productId').isMongoId().withMessage('Valid productId required'),
  body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be >=1'),
  body('shippingAddress').isString().notEmpty().withMessage('Shipping address required')
];

module.exports = { placeOrderValidator };
