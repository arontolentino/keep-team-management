exports.up = async (knex) => {
  try {
    await knex.transaction(async (trx) => {
      await trx.schema.createTable('permissions', (table) => {
        table.increments('permissionId').primary();
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
    await knex.schema.dropTableIfExists('permissions');
  } catch (error) {
    console.error(error);
  }
};
