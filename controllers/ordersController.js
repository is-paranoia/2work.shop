const knex = require("../knex/knex")

exports.getOrdersAll = async (req, res) => {
	try {
		knex.raw("select * from \"Orders\"").then((orders) =>{
			res.send(orders.rows)
		}).catch(err => console.log("Transaction", err))
	} catch (e) {
		res.status(500).json({
			message: "Server error {api:orders}",
			error: e.message
		})
	}
}

exports.getOrdersById = async (req, res) => {
	try {
		let query = knex("Orders").select("*").where("id", req.params.id).first()
		query.then(response => {
			res.send(response)
		}).catch(err => console.log("Transaction", err))
	} catch (e) {
		res.status(500).json({
			message: "Server error"
		})
	}
}

exports.getOrdersByTagId = async (req, res) => {
	try {
		knex.raw(`SELECT * FROM "Orders" WHERE "tagId"=${req.params.id} `).then((orders) =>{
			res.send(orders.rows)
		}).catch(err => console.log("Transaction", err))
	} catch (e) {
		res.status(500).json({
			message: "Server error"
		})
	}

}

exports.getOrdersByAuthorId = async (req, res) => {
	try {
		knex.raw(`SELECT * FROM "Orders" WHERE "authorId"=${req.params.authorId} `).then((orders) =>{
			res.send(orders.rows)
		}).catch(err => console.log("Transaction", err))
	} catch (e) {
		res.status(500).json({
			message: "Server error"
		})
	}
}

exports.getOrdersByWorkerId = async (req, res) => {
	try {
		knex.raw(`SELECT * FROM "Orders" WHERE "workerId"=${req.params.workerId} `).then((orders) =>{
			res.send(orders.rows)
			console.log("worker orders ", orders)
		}).catch(err => console.log("Transaction", err))
	} catch (e) {
		res.status(500).json({
			message: "Server error"
		})
	}
}

exports.getOrdersByAuthorName = async (req, res) => {
	try {
		let query = knex("Users").select("id").where("nickname", req.params.name)
		let authorId = undefined
		query.then(response => {
			response.forEach(element => {
				authorId = element["id"]
			})

			let second_query = knex("Orders").select("*").where("authorId", authorId)
			second_query.then(response => {
				res.send(response)
				console.log(response)
			})
			
		}).catch(err => console.log("Transaction", err))
		
	} catch (e) {
		res.status(500).json({
			message: "Server error"
		})
	}
}

exports.getOrdersByWorkerName = async (req, res) => {
	try {
		let query = knex("Users").select("id").where("nickname", req.params.name)
		let workerId = undefined
		query.then(response => {
			response.forEach(element => {
				workerId = element["id"]
			})

			let second_query = knex("Orders").select("*").where("workerId", workerId)
			second_query.then(response => {
				res.send(response)
				console.log(response)
			})
			
		}).catch(err => console.log("Transaction", err))
		
	} catch (e) {
		res.status(500).json({
			message: "Server error"
		})
	}
}

exports.addOrder = async (req, res) => {
	try {
		const {title, description, price} = req.body
		const order_dct = { title: title, description: description, 
			authorId: req.user.userId, price: price}
		console.log(order_dct)
		await knex("Orders").insert(order_dct).catch(err => console.log("Transaction", err))
		res.status(201).json({message: "Order has been created"})

	} catch (e) {
		res.status(500).json({
			message: "Server error {api:create_order}",
			error: e.message
		})
	}
}

exports.deleteOrderById = async (req, res) => {
	try {
		let orderId = req.params.id
		const order = await knex("Orders").where("id", orderId).first().catch(err => console.log("Transaction", err))
		console.log("Author", order.authorId)
		console.log("User", req.user.userId)
		if (req.user.userId == order.authorId){
			console.log("Delete order", req.user.userId)
			console.log("Author ", order.authorId)
			await knex("Orders").del().where("id", orderId).catch(err => console.log("Transaction", err))
			res.status(201).json({message: "Order has been delete"})
		} else {
			res.status(500).json({
				message: "DB error {api:delete:orders}"
			})
		}
	} catch (e) {
		res.status(500).json({
			message: "Server error {api:delete:orders}",
			error: e.message
		})
	}
}

exports.changeOrderById = async (req, res) => {
	try {
		const {workerId} = req.body
		const order_dct = { workerId: workerId }
		console.log(order_dct)
		await knex("Orders").update(order_dct).where("id", req.params.id).catch(err => console.log("Transaction", err))
		res.status(201).json({message: "Order has been updated"})

	} catch (e) {
		res.status(500).json({
			message: "Server error {api:put:orders}",
			error: e.message
		})
	}
}
