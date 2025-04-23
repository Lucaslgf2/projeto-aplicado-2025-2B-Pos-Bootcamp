export class UnidadesORM {
  CodigoUnidade!: string
  CodigoCondominio!: string
  Numero!: number
  Bloco?: string
  CriadoEm?: Date
  AtualizadoEm?: Date

  constructor(data: Partial<UnidadesORM>) {
    Object.assign(this, data)
  }
}
