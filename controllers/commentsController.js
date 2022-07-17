const knex = require("../knex/knex")

exports.getCommentsByOrderId = async (req, res) => {
	try {
		knex.raw(`SELECT * FROM "Comments" WHERE "orderId"=${req.params.order_id} `).then((comments) =>{
			res.send(comments.rows)
		}).catch(err => console.log("Transaction", err))
	} catch (e) {
		res.status(500).json({
			message: "Server error"
		})
	}
}

exports.addCommentByOrderId = async (req, res) => {
	try {
		const {message} = req.body
		const comment_dct = { orderId: req.params.order_id, userId: req.user.userId, message: message}
		console.log(comment_dct)
		await knex("Comments").insert(comment_dct).catch(err => console.log("Transaction", err))
		res.status(201).json({message: "Comment has been created"})

	} catch (e) {
		res.status(500).json({
			message: "Server error {api:post:comments}",
			error: e.message
		})
	}
}