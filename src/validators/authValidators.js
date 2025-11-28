const { body } = require('express-validator');

const registerValidator = [
  body('name').isString().isLength({ min: 2 }).withMessage('Name required'),
  body('email').isEmail().withMessage('Valid email required'),
  body('password').isLength({ min: 6 }).withMessage('Password min 6 chars'),
  body('phone').optional().isMobilePhone('any').withMessage('Enter valid phone')
];

const loginValidator = [
  body('email').isEmail().withMessage('Valid email required'),
  body('password').exists().withMessage('Password required')
];

module.exports = { registerValidator, loginValidator };
