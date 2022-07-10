exports.up = function (knex) {
    return knex.schema
        .createTable('Permissions', function(table) {
            table.increments('id').primary();
            table.string('permission').notNullable();
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('Permissions');
}