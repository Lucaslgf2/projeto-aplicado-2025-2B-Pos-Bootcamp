export class CondominiosORM {
  CodigoCondominio!: string
  Nome!: string
  CNPJ!: string
  CriadoEm?: Date
  AtualizadoEm?: Date

  constructor(data: Partial<CondominiosORM>) {
    Object.assign(this, data)
  }
}
