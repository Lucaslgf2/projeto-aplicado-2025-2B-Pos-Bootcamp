import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Comunicados', function (table) {
    table.uuid('CodigoComunicado', { primaryKey: true }).primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.uuid('CodigoCondominio').notNullable().references('CodigoCondominio').inTable('Condominios')
    table.string('Titulo', 150).notNullable()
    table.text('Texto').notNullable()
    table.datetime('CriadoEm', { useTz: true }).notNullable().defaultTo(knex.fn.now())
    table.datetime('AtualizadoEm', { useTz: true })
  })

  await knex.raw(`
    CREATE TRIGGER tr_Update_Comunicados
    BEFORE UPDATE ON "Comunicados"
    FOR EACH ROW
    EXECUTE FUNCTION fn_Update_Column_AtualizadoEm();
  `)
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TRIGGER IF EXISTS tr_Update_Comunicados ON "Comunicados"')
  return knex.schema.dropTable('Comunicados')
}
