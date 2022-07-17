const knex = require("../knex/knex")

exports.getPaymentsByOrderId = async (req, res) => {
	try {
		knex.raw(`SELECT * FROM "Payments" WHERE "orderId"=${req.params.id} `).then((payments) =>{
			res.send(payments.rows)
		}).catch(err => console.log("Transaction", err))
	} catch (e) {
		res.status(500).json({
			message: "Server error"
		})
	}
}

exports.addPaymentByOrderId = async (req, res) => {
	try {
		const {txHash, value, status, comment} = req.body
		const payment_dict = { orderId: req.params.order_id, userId: req.user.userId, txHash: txHash, value: value, status: status, comment: comment}
		console.log(payment_dict)
		await knex("Payments").insert(payment_dict).catch(err => console.log("Transaction", err))
		res.status(201).json({message: "Payment has been created"})

	} catch (e) {
		res.status(500).json({
			message: "Server error {api:post:comments}",
			error: e.message
		})
	}
}
