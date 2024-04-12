const { body } = require("express-validator");
const registerValidator = [
  body("firstname")
    .notEmpty()
    .trim()
    .escape()
    .withMessage("First name is required"),
  body("password").notEmpty().withMessage("Password is required"),
  body("email")
    .notEmpty()
    .isEmail()
    .normalizeEmail()
    .withMessage("Valid email is required"),
];
module.exports = registerValidator;
