import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Condominios', function (table) {
    table.uuid('CodigoCondominio', { primaryKey: true }).primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('Nome', 150).notNullable()
    table.string('CNPJ', 14).notNullable().unique()
    table.datetime('CriadoEm', { useTz: true }).notNullable().defaultTo(knex.fn.now())
    table.datetime('AtualizadoEm', { useTz: true })
  })

  await knex.raw(`
    CREATE TRIGGER tr_Update_Condominios
    BEFORE UPDATE ON "Condominios"
    FOR EACH ROW
    EXECUTE FUNCTION fn_Update_Column_AtualizadoEm();
  `)
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TRIGGER IF EXISTS tr_Update_Condominios ON "Condominios"')
  return knex.schema.dropTable('Condominios')
}
