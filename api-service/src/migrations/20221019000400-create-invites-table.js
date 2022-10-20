exports.up = async (knex) => {
  try {
    await knex.transaction(async (trx) => {
      await trx.schema.createTable('invites', (table) => {
        table
          .uuid('inviteId')
          .primary()
          .defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('businessId').notNullable();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.timestamp('createdAt').notNullable().defaultTo(knex.raw('now()'));
        table.timestamp('updatedAt').notNullable().defaultTo(knex.raw('now()'));

        table
          .foreign('businessId')
          .references('businessId')
          .inTable('businesses')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      });

      await trx.raw(`
        CREATE TRIGGER update_invite_updated_at
          BEFORE UPDATE ON invites FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();
      `);
    });
  } catch (error) {
    console.error(error);

    throw error;
  }
};

exports.down = async (knex) => {
  try {
    await knex.schema.dropTableIfExists('invites');
  } catch (error) {
    console.error(error);
  }
};
