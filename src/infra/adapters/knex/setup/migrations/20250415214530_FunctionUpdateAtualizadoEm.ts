import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE OR REPLACE FUNCTION fn_Update_Column_UpdatedAt()
    RETURNS TRIGGER AS $$
    BEGIN
      NEW."UpdatedAt" = NOW();
      RETURN NEW;
    END;
    $$ LANGUAGE plpgsql;
  `)
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP FUNCTION IF EXISTS fn_Update_Column_UpdatedAt')
}
