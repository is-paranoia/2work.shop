exports.up = function (knex) {
    return knex.schema
        .createTable('Users', function(table) {
            table.increments('id');
            table.string('email').notNullable();
            table.string('password').notNullable();
            table.datetime('registerDate').notNullable().defaultTo(knex.fn.now());
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('Users');
}