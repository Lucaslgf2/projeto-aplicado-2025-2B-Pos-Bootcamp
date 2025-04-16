export class ServerError extends Error {
  constructor(stack: string) {
    super('Erro interno no servidor! Tente novamente em alguns minutos')
    this.name = 'ServerError'
    this.stack = stack
  }
}
