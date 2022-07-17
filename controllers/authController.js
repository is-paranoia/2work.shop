const jwt = require("jsonwebtoken")
const config = require("config")
const {validationResult} = require("express-validator")
const bcrypt = require("bcrypt")
const knex = require("../knex/knex")

exports.register = async (req, res) => {
	try {
		console.log("auth")
		const errors = validationResult(req)
		if (!errors.isEmpty()){
			return res.status(400).json({
				errors: errors.array(),
				message: "Register error",
				test: req.body
			})
		}
		const {email, nickname, password} = req.body
		console.log(req.body)
		const existUser = await knex("Users").where("email", email)
		console.log(existUser)
		console.log("jjj", existUser.length)
		if (existUser.length !== 0) {
			return res.status(400).json({message: "User is already exists"})
		}
		const hashedPassword = await bcrypt.hash(password, 12)
		await knex("Users").insert({ email: email, nickname: nickname, password: hashedPassword }).catch(err => console.log("Transaction", err))
		res.status(201).json({message: "User has been created"})

	} catch (e) {
		res.status(500).json({
			message: "Server error",
			error: e.message
		})
	}

}

exports.login = async (req, res) => {
	try {
		console.log("post on login")
		const errors = validationResult(req)
		if (!errors.isEmpty()){
			return res.status(400).json({
				errors: errors.array(),
				message: "Login error"
			})
		}
        
		const {email, password} = req.body

		const user = await knex("Users").where("email", email).first()
		if (user == undefined || user == null) {
			return res.status(400).json({
				message: "User doesnt exist"
			})
		}

		const isMatch = await bcrypt.compare(password, user.password)

		if (!isMatch) {
			return res.status(400).json({message: "Error. Check input credentials"})
		}

		const token = jwt.sign(
			{userId: user.id, roleId: user.roleId},
			config.get("jwtSecret"),
			{expiresIn: "24h"}
		)
		res.json({token: token, userId: user.id, nickname: user.nickname, roleId: user.roleId})

	} catch (e) {
		res.status(500).json({
			message: "Server error",
			error: e.message
		})
	}
}