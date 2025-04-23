import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('Usuarios', function (table) {
    table.uuid('CodigoUsuario', { primaryKey: true }).primary().defaultTo(knex.raw('gen_random_uuid()'))
    table.string('Email', 150).notNullable().unique()
    table.text('Senha')
    table.string('Nome', 100).notNullable()
    table.string('Sobrenome', 200).notNullable()
    table.string('CPF', 14).unique().notNullable()
    table.enum('Gênero', ['male', 'female', 'non_binary', 'trans_male', 'trans_female', 'prefer_not_say']).notNullable()
    table.string('Celular', 20).notNullable()
    table.date('DataNascimento').notNullable()
    table.datetime('CriadoEm', { useTz: true }).notNullable().defaultTo(knex.fn.now())
    table.datetime('AtualizadoEm', { useTz: true })
  })

  await knex.raw(`
    CREATE TRIGGER tr_Update_Usuarios
    BEFORE UPDATE ON "Usuarios"
    FOR EACH ROW
    EXECUTE FUNCTION fn_Update_Column_AtualizadoEm();
  `)
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TRIGGER IF EXISTS tr_Update_Usuarios ON "Usuarios"')
  return knex.schema.dropTable('Usuarios')
}
