exports.up = function (knex) {
	return knex.schema
		.createTable("PaymentsStatus", function(table) {
			table.increments("id").primary()
			table.integer("orderId").notNullable().references("id").inTable("Orders").index().onDelete("CASCADE")
			table.string("authorStatus").defaultTo(null)
			table.string("workerStatus").defaultTo(null)
			table.string("globalStatus").defaultTo(null)
		})
}

exports.down = function (knex) {
	return knex.schema
		.dropTable("PaymentsStatus")
}