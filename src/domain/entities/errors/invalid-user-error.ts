import { BussinessError } from './abstract-bussiness-error'

export class InvalidUserError extends BussinessError {
  constructor() {
    super('Usuário informado é inválido')
    this.name = 'InvalidUserError'
  }
}
