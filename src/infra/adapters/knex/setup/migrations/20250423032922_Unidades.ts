import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Unidades', function (table) {
    table.uuid('CodigoUnidade', { primaryKey: true }).primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('CodigoCondominio').notNullable().references('CodigoCondominio').inTable('Condominios')
    table.integer('Numero').notNullable()
    table.string('Bloco', 20)
    table.datetime('CriadoEm', { useTz: true }).notNullable().defaultTo(knex.fn.now())
    table.datetime('AtualizadoEm', { useTz: true })
  })

  await knex.raw(`
    CREATE TRIGGER tr_Update_Unidades
    BEFORE UPDATE ON "Unidades"
    FOR EACH ROW
    EXECUTE FUNCTION fn_Update_Column_AtualizadoEm();
  `)
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TRIGGER IF EXISTS tr_Update_Unidades ON "Unidades"')
  return knex.schema.dropTable('Unidades')
}
