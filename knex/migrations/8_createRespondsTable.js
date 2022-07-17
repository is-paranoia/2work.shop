exports.up = function (knex) {
	return knex.schema
		.createTable("Responds", function(table) {
			table.increments("id").primary()
			table.integer("orderId").notNullable().references("id").inTable("Orders").index().onDelete("CASCADE")
			table.integer("userId").notNullable().references("id").inTable("Users").index().onDelete("CASCADE")
		})
}

exports.down = function (knex) {
	return knex.schema
		.dropTable("Responds")
}