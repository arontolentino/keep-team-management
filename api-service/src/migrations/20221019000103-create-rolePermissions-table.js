exports.up = async (knex) => {
  try {
    await knex.transaction(async (trx) => {
      await trx.schema.createTable('rolePermissions', (table) => {
        table.integer('roleId');
        table.integer('permissionId');

        table
          .foreign('roleId')
          .references('roleId')
          .inTable('roles')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');

        table
          .foreign('permissionId')
          .references('permissionId')
          .inTable('permissions')
          .onUpdate('CASCADE')
          .onDelete('CASCADE');
      });
    });
  } catch (error) {
    console.error(error);

    throw error;
  }
};

exports.down = async (knex) => {
  try {
    await knex.schema.dropTableIfExists('rolePermissions');
  } catch (error) {
    console.error(error);
  }
};
