const knex = require("../knex/knex")

exports.getTagsAll = async (req, res) => {
	try {
		knex.raw("SELECT * FROM \"Tags\"").then((tags) =>{
			res.send(tags.rows)
		}).catch(err => console.log("Transaction", err))
	} catch (e) {
		res.status(500).json({
			message: "Server error"
		})
	}
}

exports.addTag = async (req, res) => {
	try {
		const {tag} = req.body
		const tag_dct = { tag: tag}
		console.log(tag_dct)
		await knex("Tags").insert(tag_dct).catch(err => console.log("Transaction", err))
		res.status(201).json({message: "Tag has been created"})

	} catch (e) {
		res.status(500).json({
			message: "Server error {api:post:comments}",
			error: e.message
		})
	}
}