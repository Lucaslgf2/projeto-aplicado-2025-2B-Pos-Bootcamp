export const genericSchemas = {
  ErrorResponse: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'Mensagem de erro'
      },
      code: {
        type: 'integer',
        description: 'Código do erro'
      }
    }
  }
}
