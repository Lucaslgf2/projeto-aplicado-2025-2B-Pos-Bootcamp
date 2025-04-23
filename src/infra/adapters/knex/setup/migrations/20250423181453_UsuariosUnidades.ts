import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('UsuariosUnidades', function (table) {
    table.uuid('CodigoUsuario').notNullable().references('CodigoUsuario').inTable('Usuarios').primary()
    table.uuid('CodigoUnidade').notNullable().references('CodigoUnidade').inTable('Unidades').primary()
    //table.uuid('CodigoPerfil').notNullable().references('CodigoPerfil').inTable('Perfis')
    table.datetime('CriadoEm', { useTz: true }).notNullable().defaultTo(knex.fn.now())
    table.datetime('AtualizadoEm', { useTz: true })
  })

  await knex.raw(`
    CREATE TRIGGER tr_Update_UsuariosUnidades
    BEFORE UPDATE ON "UsuariosUnidades"
    FOR EACH ROW
    EXECUTE FUNCTION fn_Update_Column_AtualizadoEm();
  `)
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw('DROP TRIGGER IF EXISTS tr_Update_UsuariosUnidades ON "UsuariosUnidades"')
  return knex.schema.dropTable('UsuariosUnidades')
}
