export class ComunicadosORM {
  CodigoComunicado!: string
  CodigoCondominio!: string
  Titulo!: string
  Texto!: string
  CriadoEm?: Date
  AtualizadoEm?: Date

  constructor(data: Partial<ComunicadosORM>) {
    Object.assign(this, data)
  }
}
