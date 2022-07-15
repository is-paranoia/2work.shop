// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
 module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'postgres',
      user:     'postgres',
      password: 'root',
      host: 'localhost',
      port: "5433"
    },
    migrations: {
      directory: 'knex/migrations',
      tableName: 'knex_migrations',
    },
    seeds: {
      directory: 'knex/seeds',
    }
  },
};
