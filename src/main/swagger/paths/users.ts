export const usersPath = {
  '/api/users': {
    get: {
      tags: ['Usuários'],
      summary: 'Obter dados do usuário',
      description: 'Obtém as informações detalhadas de um usuário autenticado.',
      responses: {
        200: {
          description: 'Dados do usuário retornados com sucesso.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GetUserResponse'
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
      }
    },
    post: {
      tags: ['Usuários'],
      summary: 'Criar um novo usuário',
      description: 'Endpoint para criar um novo usuário com todos os campos obrigatórios e validação.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/CreateUserRequest'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Usuário criado com sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/CreateUserResponse'
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
      }
    },
    put: {
      tags: ['Usuários'],
      summary: 'Atualiza informações de um usuário',
      description: 'Atualiza os dados de um usuário específico com base no `userId` fornecido.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UpdateUserRequest'
            }
          }
        }
      },
      responses: {
        204: {
          description: 'No Content - Usuário atualizado com sucesso'
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
      }
    },
    delete: {
      tags: ['Usuários'],
      summary: 'Deletar um usuário (exclusão lógica)',
      description: 'Marca o usuário como excluído, sem remover os dados do banco de dados.',
      parameters: [
        {
          in: 'path',
          name: 'userId',
          required: true,
          description: 'ID do usuário a ser excluído',
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        200: {
          description: 'Usuário deletado com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  message: {
                    type: 'string',
                    description: 'Mensagem de sucesso indicando que o usuário foi deletado logicamente.',
                    example: 'Usuário deletado com sucesso!'
                  }
                }
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
          description: 'Não autorizado - Token inválido ou ausente',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        404: {
          description: 'Usuário não encontrado',
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
  }
}
