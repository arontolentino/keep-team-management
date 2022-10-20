exports.up = async (knex) => {
  try {
    await knex.transaction(async (trx) => {
      await trx.schema.createTable('roles', (table) => {
        table.increments('roleId').primary();
        table.string('name').notNullable();
      });
    });
  } catch (error) {
    console.error(error);

    throw error;
  }
};

exports.down = async (knex) => {
  try {
    await knex.schema.dropTableIfExists('roles');
  } catch (error) {
    console.error(error);
  }
};
