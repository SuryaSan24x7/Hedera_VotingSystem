const { body } = require("express-validator");
const adminValidator = [
    body("_id").notEmpty().withMessage("Id value is Required")
]
module.exports = adminValidator ;