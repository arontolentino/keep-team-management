exports.up = async (knex) => {
  try {
    await knex.transaction(async (trx) => {
      await trx.schema.createTable('businesses', (table) => {
        table
          .uuid('businessId')
          .primary()
          .defaultTo(knex.raw('uuid_generate_v4()'));
        table.string('name').notNullable();
        table.timestamp('createdAt').notNullable().defaultTo(knex.raw('now()'));
        table.timestamp('updatedAt').notNullable().defaultTo(knex.raw('now()'));
      });

      await trx.raw(`
        CREATE TRIGGER update_business_updated_at
          BEFORE UPDATE ON businesses FOR EACH ROW EXECUTE PROCEDURE  update_updated_at_column();
      `);
    });
  } catch (error) {
    console.error(error);

    throw error;
  }
};

exports.down = async (knex) => {
  try {
    await knex.schema.dropTableIfExists('businesses');
  } catch (error) {
    console.error(error);
  }
};
