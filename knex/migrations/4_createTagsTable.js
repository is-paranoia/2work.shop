exports.up = function (knex) {
	return knex.schema
		.createTable("Tags", function(table) {
			table.increments("id").primary()
			table.string("tag").notNullable()
		})
}

exports.down = function (knex) {
	return knex.schema
		.dropTable("Tags")
}