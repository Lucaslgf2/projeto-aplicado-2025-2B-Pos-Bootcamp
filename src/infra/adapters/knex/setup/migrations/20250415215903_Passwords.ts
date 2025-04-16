import { type Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Passwords', function (table) {
    table.uuid('UserId').notNullable().references('UserId').inTable('Users')
    table.string('Password').notNullable()
    table.boolean('Active').notNullable().defaultTo(true)
    table.datetime('CreatedAt', { useTz: true }).notNullable().defaultTo(knex.fn.now())
    table.datetime('UpdatedAt', { useTz: true })
  })

  // Adiciona um índice único parcial para permitir apenas um registro com active=true por UserId
  await knex.raw(`
    CREATE UNIQUE INDEX uq_UserId_Active_true
    ON "Passwords" ("UserId")
    WHERE "Active" = true
  `)

  await knex.raw(`
    CREATE TRIGGER tr_Update_Passwords
    BEFORE UPDATE ON "Passwords"
    FOR EACH ROW
    EXECUTE FUNCTION fn_Update_Column_UpdatedAt();
  `)
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TRIGGER IF EXISTS tr_Update_Passwords ON "Passwords"')
  return knex.schema.dropTable('Passwords')
}
