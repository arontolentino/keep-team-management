exports.up = async (knex) => {
  try {
    await knex.transaction(async (trx) => {
      await trx.schema.createTable('tokens', (table) => {
        table.increments('tokenId').primary();
        table.uuid('userId').notNullable();
        table.string('token').notNullable();
        table.enu('type', ['ACCESS', 'REFRESH']).notNullable();
        table.datetime('expires').notNullable();
        table.timestamp('createdAt').notNullable().defaultTo(knex.raw('now()'));
        table.timestamp('updatedAt').notNullable().defaultTo(knex.raw('now()'));

        table
          .foreign('userId')
          .references('userId')
          .inTable('users')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      });

      await trx.raw(`
        CREATE TRIGGER update_token_updated_at
          BEFORE UPDATE ON tokens FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
      `);
    });
  } catch (error) {
    console.error(error);

    throw error;
  }

  return;
};

exports.down = async (knex) => {
  try {
    await knex.schema.dropTableIfExists('tokens');
  } catch (error) {
    console.error(error);
  }
};
