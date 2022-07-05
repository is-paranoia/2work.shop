exports.up = function (knex) {
    return knex.schema
        .createTable('Orders', function(table) {
            table.increments('id').primary();
            table.string('title').notNullable();
            table.string('description').notNullable();
            table.integer('authorId').notNullable().references('id').inTable('Users').index().onDelete("SET NULL");
            table.integer('workerId').notNullable().references('id').inTable('Users').index().onDelete("SET NULL");
            table.float('price').notNullable();
            table.boolean('isStarted').notNullable().defaultTo(0);
            table.string('stage').notNullable();
            table.datetime('createdAt').notNullable().defaultTo(knex.fn.now());
            table.datetime('endedAt');
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('Orders');
}