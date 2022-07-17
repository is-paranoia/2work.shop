const knex = require("../knex/knex")

exports.getRespondsByOrderId = async (req, res) => {
	try {
		let query = knex("Responds").select("*").where("orderId", req.params.id)
		query.then(response => {
			res.json(response)
		}).catch(err => console.log("Transaction", err))
	} catch (e) {
		res.status(500).json({
			message: "Server error"
		})
	}
}

exports.addRespondsByOrderId = async (req, res) => {
	try {
		const respond_dct = { orderId: req.params.id, userId: req.user.userId}
		await knex("Responds").insert(respond_dct).catch(err => console.log("Transaction", err))
		res.status(201).json({message: "Respond has been created"})
	} catch (e) {
		res.status(500).json({
			message: "Server error {api:post:responds}",
			error: e.message
		})
	}
}

exports.deleteRespondsByOrderId = async (req, res) => {
	try {
		console.log(req.user.roleId)
		if (req.user.userId == req.body.userId || req.user.roleId == 2){
			console.log(req.params.id, req.body.userId)
			await knex("Responds").del().where("orderId", req.params.id).where("userId", req.body.userId).catch(err => console.log("Transaction", err))
			res.status(201).json({message: "Respond has been deleted"})
		} else {
			res.status(400).json({
				message: "Restricted"
			})
		}
	} catch (e) {
		res.status(500).json({
			message: "Server error {api:post:responds}",
			error: e.message
		})
	}
}