exports.up = function (knex) {
    return knex.schema
        .createTable('Payments', function(table) {
            table.increments('id').primary();
            table.integer('orderId').notNullable().references('id').inTable('Orders').index().onDelete("SET NULL");
            table.integer('userId').notNullable().references('id').inTable('Users').index().onDelete("SET NULL");
            table.string('txHash').notNullable();
            table.string('status').notNullable();
            table.string('value').notNullable();
            table.string('comment');
            table.datetime('timestamp').notNullable().defaultTo(knex.fn.now());
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('Payments');
}