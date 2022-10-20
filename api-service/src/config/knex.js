const Knex = require('knex');

const connectionConfig = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD,
  database: process.env.PG_DB,
};

const knex = Knex({
  client: 'postgresql',
  connection: connectionConfig,
});

module.exports = knex;
