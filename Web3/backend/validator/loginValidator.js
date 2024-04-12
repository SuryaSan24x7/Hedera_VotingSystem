const { body } = require("express-validator");
const loginValidator = [
    body('email').notEmpty().isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('password').notEmpty().withMessage('Password is required')
];
module.exports = loginValidator;
