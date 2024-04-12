const { body } = require("express-validator");
const personValidator = [
    body("_id").notEmpty().withMessage("Id value is Required")
]
module.exports = personValidator ;