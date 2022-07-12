exports.up = function (knex) {
    return knex.schema
        .createTable('Comments', function(table) {
            table.increments('id').primary();
            table.integer('orderId').notNullable().references('id').inTable('Orders').index().onDelete("CASCADE");
            table.integer('userId').notNullable().references('id').inTable('Users').index().onDelete("SET NULL");
            table.string('message').notNullable();
            table.datetime('createdAt').notNullable().defaultTo(knex.fn.now());
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('Comments');
}