exports.up = function (knex) {
    return knex.schema
        .createTable('ChatMessages', function(table) {
            table.increments('id').primary();
            table.integer('chatId').notNullable();
            table.integer('userId').notNullable().references('id').inTable('Users').index().onDelete("CASCADE");
            table.string('message').notNullable();
            table.string('timestamp').notNullable();
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTable('ChatMessages');
}