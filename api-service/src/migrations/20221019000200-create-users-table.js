exports.up = async (knex) => {
  try {
    await knex.transaction(async (trx) => {
      await trx.schema.createTable('users', (table) => {
        table
          .uuid('userId')
          .primary()
          .defaultTo(knex.raw('uuid_generate_v4()'));
        table.uuid('businessId').notNullable();
        table.integer('roleId').notNullable();
        table.string('name').notNullable();
        table.string('email').unique().notNullable();
        table.string('password');
        table.timestamp('createdAt').notNullable().defaultTo(knex.raw('now()'));
        table.timestamp('updatedAt').notNullable().defaultTo(knex.raw('now()'));

        table
          .foreign('businessId')
          .references('businessId')
          .inTable('businesses')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');

        table
          .foreign('roleId')
          .references('roleId')
          .inTable('roles')
          .onUpdate('CASCADE');
      });

      await trx.raw(`
        CREATE TRIGGER update_user_updated_at
          BEFORE UPDATE ON users FOR EACH ROW EXECUTE PROCEDURE  update_updated_at_column();
      `);
    });
  } catch (error) {
    console.error(error);

    throw error;
  }
};

exports.down = async (knex) => {
  try {
    await knex.schema.dropTableIfExists('users');
  } catch (error) {
    console.error(error);
  }
};
