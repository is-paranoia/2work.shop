exports.up = function (knex) {
    return knex.schema
        .createTable('Users', function(table) {
            table.increments('id').primary();
            table.string('nickname').notNullable();
            table.string('email').notNullable();
            table.string('password').notNullable();
            table.string('wallet');
            table.boolean('isAdmin').notNullable().defaultTo(0);
            table.datetime('lastLogin').notNullable().defaultTo(knex.fn.now());
            table.datetime('registerDate').notNullable().defaultTo(knex.fn.now());
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('Users');
}