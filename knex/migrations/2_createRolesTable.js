exports.up = function (knex) {
	return knex.schema
		.createTable("Roles", function(table) {
			table.increments("id").primary()
			table.integer("permissionsId").notNullable().references("id").inTable("Permissions").index().onDelete("SET NULL")
			table.string("name").notNullable()
		})
}

exports.down = function (knex) {
	return knex.schema
		.dropTable("Roles")
}