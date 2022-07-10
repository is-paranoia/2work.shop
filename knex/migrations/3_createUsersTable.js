exports.up = function (knex) {
    return knex.schema
        .createTable('Users', function(table) {
            table.increments('id').primary();
            table.string('nickname').notNullable();
            table.string('email').notNullable();
            table.string('password').notNullable();
            table.string('wallet');
            table.integer('roleId').notNullable().references('id').inTable('Roles').index().defaultTo(1).onDelete("SET NULL");
            table.datetime('registerDate').notNullable().defaultTo(knex.fn.now());
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('Users');
}