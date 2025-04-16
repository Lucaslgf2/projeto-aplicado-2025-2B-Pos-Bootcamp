import { BussinessError } from './abstract-bussiness-error'

export class GenericError extends BussinessError {
  constructor(errorMsg: string) {
    super(errorMsg)
    this.name = 'GenericError'
  }
}
