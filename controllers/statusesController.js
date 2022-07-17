const knex = require("../knex/knex")

exports.getStatusByOrderId = async (req, res) => {
	try {
		let query = knex("PaymentsStatus").select("*").where("orderId", req.params.id).first()
		query.then(response => {
			res.send(response)
		})
	} catch (e) {
		res.status(500).json({
			message: "Server error"
		})
	}
}

exports.addStatusByOrderId = async (req, res) => {
	try {
		await knex("PaymentsStatus").insert({orderId: req.params.id}).catch(err => console.log("Transaction", err))
		res.status(201).json({message: "Status has been created"})
	} catch (e) {
		res.status(500).json({
			message: "Server error"
		})
	}
}

exports.changeWorkerStatusByOrderId = async (req, res) => {
	try {
		const order_dct = { workerStatus: "submit" }
		await knex("PaymentsStatus").update(order_dct).where("orderId", req.params.id).catch(err => console.log("Transaction", err))
		res.status(201).json({message: "Status has been updated"})

	} catch (e) {
		res.status(500).json({
			message: "Server error {api:put:orders}",
			error: e.message
		})
	}
}

exports.changeAuthorStatusByOrderId = async (req, res) => {
	try {
		const order_dct = { authorStatus: "submit" }
		await knex("PaymentsStatus").update(order_dct).where("orderId", req.params.id).catch(err => console.log("Transaction", err))
		res.status(201).json({message: "Status has been updated"})

	} catch (e) {
		res.status(500).json({
			message: "Server error {api:put:orders}",
			error: e.message
		})
	}
}
