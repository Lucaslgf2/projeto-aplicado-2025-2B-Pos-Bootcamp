import { BussinessError } from './abstract-bussiness-error'

export class InvalidCpfError extends BussinessError {
  constructor() {
    super('CPF informado é inválido')
    this.name = 'InvalidCpfError'
  }
}
