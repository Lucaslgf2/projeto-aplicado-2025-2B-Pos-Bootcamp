import { BussinessError } from './abstract-bussiness-error'

export class InvalidUUIDError extends BussinessError {
  constructor() {
    super('UUID informado é inválido')
    this.name = 'InvalidUUIDError'
  }
}
