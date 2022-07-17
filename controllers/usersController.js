const knex = require("../knex/knex")

exports.getNicknameByUserId = async (req, res) => {
	try {
		let query = knex("Users").select("nickname").where("id", req.params.id).first()
		query.then(response => {
			res.send(response)
		})
	} catch (e) {
		res.status(500).json({
			message: "Server error"
		})
	}
}

exports.getNicknameByUserAuth = async (req, res) => {
	try {
		let query = knex("Users").select("nickname").where("id", req.user.userId).first()
		query.then(response => {
			res.send(response)
		})
	} catch (e) {
		res.status(500).json({
			message: "Server error"
		})
	}
}