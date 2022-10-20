exports.up = async (knex) => {
  return await knex.raw(`
    CREATE OR REPLACE FUNCTION update_updated_at_column()   
    RETURNS TRIGGER AS $$
    BEGIN
        NEW."updatedAt" = now();
        RETURN NEW;   
    END;
    
    $$ language 'plpgsql';
  `);
};

exports.down = async (knex) => {
  return await knex.raw(`DROP FUNCTION IF EXISTS update_updated_at_column();`);
};
