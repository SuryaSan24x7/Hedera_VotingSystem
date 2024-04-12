const { body } = require("express-validator");
const voterValidator = [
    body("_id").notEmpty().withMessage("Id value is Required")
]
module.exports = voterValidator ;