const knex = require("../knex/knex")

exports.getMessageByChatId = async (req, res) => {
	try {
		let query = knex("ChatMessages").select("*").where("chatId", req.params.id)
		query.then(response => {
			res.send(response)
		}).catch(err => console.log("Transaction", err))
	} catch (e) {
		res.status(500).json({
			message: "Server error"
		})
	}
}

exports.addMessageByChatId = async (req, res) => {
	try {
		const {chatId, userId, message, timestamp} = req.body
		const message_dct = { chatId: chatId, userId: userId, message: message, timestamp: timestamp}
		await knex("ChatMessages").insert(message_dct).catch(err => console.log("Transaction", err))
		res.status(201).json({message: "ChatMessage has been created"})
	} catch (e) {
		res.status(500).json({
			message: "Server error {api:post:comments}",
			error: e.message
		})
	}
}