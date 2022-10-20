exports.up = async (knex) => {
  return await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');
};

exports.down = async (knex) => {
  return await knex.raw('DROP EXTENSION IF EXISTS "uuid-ossp";');
};
