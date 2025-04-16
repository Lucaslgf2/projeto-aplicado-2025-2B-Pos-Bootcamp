import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Users', function (table) {
    table.uuid('UserId', { primaryKey: true }).primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('Email').notNullable().unique()
    table.boolean('IsDeleted').notNullable().defaultTo(false)
    table.datetime('CreatedAt', { useTz: true }).notNullable().defaultTo(knex.fn.now())
    table.datetime('UpdatedAt', { useTz: true })
    table.datetime('DeletedAt', { useTz: true })
  })

  await knex.raw(`
    CREATE TRIGGER tr_Update_Users
    BEFORE UPDATE ON "Users"
    FOR EACH ROW
    EXECUTE FUNCTION fn_Update_Column_UpdatedAt();
  `)
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TRIGGER IF EXISTS tr_Update_Users ON "Users"')
  return knex.schema.dropTable('Users')
}
