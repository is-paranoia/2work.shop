exports.seed = function(knex) {
	return knex("Tags").del()
		.then(function () {
			return knex("Tags").insert([
				{
					id: 1,
					tag: "IT"
				},
				{
					id: 2,
					tag: "Medicine"
				},
				{
					id: 3,
					tag: "Marketing"
				},
				{
					id: 4,
					tag: "Consulting"
				},
			])
		})
}