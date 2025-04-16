import { BussinessError } from './abstract-bussiness-error'

export class InvalidCredentialsError extends BussinessError {
  constructor() {
    super('Credenciais inválidas! Tente novamente')
    this.name = 'InvalidCredentialsError'
  }
}
