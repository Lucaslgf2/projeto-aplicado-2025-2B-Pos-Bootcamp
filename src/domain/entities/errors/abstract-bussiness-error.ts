export abstract class BussinessError extends Error {
  constructor(msg?: string) {
    super(msg)
    this.name = 'BussinessError'
  }
}
