const {body} = require("express-validator")
const {Router} = require("express")
const router = Router()

const authController = require("../controllers/authController")

router.post(
	"/register", 
	[
		body("email", "Email error").isEmail(),
		body("password", "Password error").isLength({min: 6})
	], authController.register)

router.post(
	"/login",
	[
		body("email", "Email error").normalizeEmail().isEmail(),
		body("password", "Password error").exists()
	], authController.login)

module.exports = router