export const topicsPath = {
  '/api/topics': {
    get: {
      tags: ['Tópicos'],
      summary: 'Listar tópicos',
      description: 'Endpoint para listar tópicos predefinidos e, opcionalmente, tópicos personalizados do usuário.',
      parameters: [
        {
          name: 'includeCustomTopics',
          in: 'query',
          required: false,
          schema: {
            type: 'boolean'
          },
          description: 'Incluir tópicos personalizados do usuário na lista'
        }
      ],
      responses: {
        200: {
          description: 'Lista de tópicos obtida com sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ListTopicsResponse'
              }
            }
          }
        },
        400: {
          description: 'Parâmetros de requisição inválidos',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      },
      security: [
        {
          bearerAuth: []
        }
      ]
    }
  },
  '/api/profile/topics': {
    put: {
      tags: ['Tópicos'],
      summary: 'Atualizar tópicos do usuário',
      description: 'Endpoint para atualizar os tópicos de interesse de um usuário autenticado.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateUserTopicsRequest'
            }
          }
        }
      },
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'Tópicos do usuário atualizados com sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/UpdateUserTopicsResponse'
              }
            }
          }
        },
        400: {
          description: 'Parâmetros de requisição inválidos',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Não autorizado. Token de autenticação inválido ou ausente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        }
      }
    }
  }
}
