// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: "picker"
    },
    migrations: {
      tableName: "knex_migrations",
      directory: "./db/migrations"
    }

  },
};
