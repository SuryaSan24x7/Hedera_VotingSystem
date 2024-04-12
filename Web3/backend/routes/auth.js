const express = require("express")
const router = express.Router()

const authController = require("../controller/auth")
const registerValidator = require("../validator/registerValidator")
const loginValidator = require("../validator/loginValidator")
router.post("/register", registerValidator, authController.registerUser)
router.post("/login",loginValidator, authController.login)
router.post("/user",authController.authorizeToken, authController.getUser)
router.post("/logout", authController.logout)
router.post("/vote",authController.authorizeToken,authController.checkIfUserHasVoted,authController.vote)
module.exports = router;