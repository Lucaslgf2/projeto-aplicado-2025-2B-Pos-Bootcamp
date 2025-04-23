import { GenderEnum } from '@/domain/entities/types-and-enums'

export class UsuariosORM {
  CodigoUsuario!: string
  Email!: string
  Senha?: string
  Nome!: string
  Sobrenome!: string
  CPF!: string
  Gênero!: GenderEnum
  Celular!: string
  DataNascimento!: Date
  CriadoEm?: Date
  AtualizadoEm?: Date

  constructor(data: Partial<UsuariosORM>) {
    Object.assign(this, data)
  }
}
