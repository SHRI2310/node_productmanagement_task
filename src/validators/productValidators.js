const { body, param } = require('express-validator');

const createProductValidator = [
  body('name').isString().notEmpty(),
  body('description').isString().notEmpty(),
  body('price').isFloat({ min: 0 }),
  body('stock').isInt({ min: 0 }),
  body('sku').isString().notEmpty()
];

const updateProductValidator = [
  param('id').isMongoId(),
  body('price').optional().isFloat({ min: 0 }),
  body('stock').optional().isInt({ min: 0 })
];

module.exports = { createProductValidator, updateProductValidator };
