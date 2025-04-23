export class UsuariosUnidadesORM {
  CodigoUsuario!: string
  CodigoUnidade!: string
  CriadoEm?: Date
  AtualizadoEm?: Date

  constructor(data: Partial<UsuariosUnidadesORM>) {
    Object.assign(this, data)
  }
}
