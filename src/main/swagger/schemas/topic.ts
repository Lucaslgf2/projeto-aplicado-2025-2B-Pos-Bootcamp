export const topicSchemas = {
  ListTopicsResponse: {
    type: 'object',
    properties: {
      topics: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'Identificador único do tópico'
            },
            name: {
              type: 'string',
              description: 'Nome do tópico'
            },
            isCustom: {
              type: 'boolean',
              description: 'Indica se o tópico é personalizado pelo usuário'
            }
          }
        }
      }
    }
  },
  UpdateUserTopicsRequest: {
    type: 'object',
    required: ['topicNames'],
    properties: {
      topicNames: {
        type: 'array',
        items: {
          type: 'string'
        },
        description: 'Lista de nomes de tópicos de interesse para associar ao usuário'
      }
    }
  },
  UpdateUserTopicsResponse: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description: 'Mensagem de confirmação da atualização dos tópicos'
      }
    }
  }
}
