exports.up = async (knex) => {
  try {
    await knex.transaction(async (trx) => {
      await trx.schema.createTable('cards', (table) => {
        table
          .uuid('cardId')
          .primary()
          .defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('userId').notNullable();
        table.uuid('businessId').notNullable();
        table.string('name').notNullable();
        table.enu('type', ['VIRTUAL', 'PHYSICAL']).notNullable();
        table.enu('status', ['ACTIVE', 'REQUESTED']).notNullable();
        table.enu('limitCurrency', ['CAD', 'USD']).notNullable();
        table.decimal('limitAmount', 14, 2);
        table.timestamp('createdAt').notNullable().defaultTo(knex.raw('now()'));
        table.timestamp('updatedAt').notNullable().defaultTo(knex.raw('now()'));

        table
          .foreign('businessId')
          .references('businessId')
          .inTable('businesses')
          .onUpdate('CASCADE');

        table
          .foreign('userId')
          .references('userId')
          .inTable('users')
          .onUpdate('CASCADE');
      });

      await trx.raw(`
        CREATE TRIGGER update_card_updated_at
          BEFORE UPDATE ON cards FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
      `);
    });
  } catch (error) {
    console.error(error);

    throw error;
  }
};

exports.down = async (knex) => {
  try {
    await knex.schema.dropTableIfExists('cards');
  } catch (error) {
    console.error(error);
  }
};
