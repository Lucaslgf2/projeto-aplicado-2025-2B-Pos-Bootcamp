import { BussinessError } from './abstract-bussiness-error'

export class TokenExpiredError extends BussinessError {
  constructor() {
    super('Token de Acesso Expirado')
    this.name = 'TokenExpiredError'
  }
}

export class JsonWebTokenError extends BussinessError {
  constructor() {
    super('Token JWT Inválido')
    this.name = 'JsonWebTokenError'
  }
}
