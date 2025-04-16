export const paymentsPath = {
  '/api/payment-methods': {
    get: {
      tags: ['Métodos de Pagamento'],
      summary: 'Obtém métodos de pagamento de um usuário',
      description: 'Retorna os métodos de pagamento cadastrados para um usuário específico.',
      responses: {
        200: {
          description: 'Métodos de pagamento encontrados.',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/PaymentMethod'
                }
              }
            }
          }
        },
        204: {
          description: 'Nenhum método de pagamento encontrado.'
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
    }
  },

  '/api/payment-methods/pix': {
    post: {
      tags: ['Métodos de Pagamento'],
      summary: 'Adiciona um método de pagamento PIX para o usuário',
      description: 'Cria um método de pagamento PIX associado a um usuário específico.',
      requestBody: {
        description: 'Dados do método de pagamento PIX a ser criado.',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/PaymentPixRequest'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Método de pagamento PIX criado com sucesso.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PaymentPixResponse'
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
    }
  },
  '/api/payment-methods/pix/{paymentMethodId}': {
    put: {
      summary: 'Atualizar método de pagamento PIX',
      description: 'Atualiza as informações de um método de pagamento PIX para um usuário autenticado.',
      tags: ['Métodos de Pagamento'],
      parameters: [
        {
          name: 'paymentMethodId',
          in: 'path',
          required: true,
          description: 'Identificador único do método de pagamento.',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                accountName: {
                  type: 'string',
                  description: 'Nome associado à conta PIX.'
                },
                keyType: {
                  type: 'string',
                  description: 'Tipo da chave PIX.',
                  enum: ['cpf', 'random']
                },
                keyValue: {
                  type: 'string',
                  description: 'Valor da chave PIX.'
                }
              },
              required: ['accountName', 'keyType', 'keyValue']
            }
          }
        }
      },
      responses: {
        204: {
          description: 'Método de pagamento alterado com sucesso'
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
    }
  },

  '/api/payment-methods/ted': {
    post: {
      tags: ['Métodos de Pagamento'],
      summary: 'Adiciona um método de pagamento TED para o usuário',
      description: 'Cria um método de pagamento TED associado a um usuário específico.',
      requestBody: {
        description: 'Dados do método de pagamento TED a ser criado.',
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/PaymentTedRequest'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Método de pagamento TED criado com sucesso.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PaymentTedResponse'
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
    }
  },
  '/api/payment-methods/ted/{paymentMethodId}': {
    put: {
      summary: 'Atualizar método de pagamento TED',
      description: 'Atualiza as informações de um método de pagamento TED para um usuário autenticado.',
      tags: ['Métodos de Pagamento'],
      parameters: [
        {
          name: 'paymentMethodId',
          in: 'path',
          required: true,
          description: 'Identificador único do método de pagamento.',
          schema: {
            type: 'string',
            format: 'uuid'
          }
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                accountName: {
                  type: 'string',
                  description: 'Nome associado à conta do método de pagamento.'
                },
                bankCode: {
                  type: 'integer',
                  description: 'Código do banco para a transação TED.'
                },
                accountType: {
                  type: 'string',
                  description: 'Tipo da conta bancária.',
                  enum: ['checking', 'savings']
                },
                beneficiaryName: {
                  type: 'string',
                  description: 'Nome do beneficiário.'
                },
                beneficiaryCpf: {
                  type: 'string',
                  description: 'CPF do beneficiário.'
                },
                agencyNumber: {
                  type: 'string',
                  description: 'Número da agência.'
                },
                accountNumber: {
                  type: 'string',
                  description: 'Número da conta bancária.'
                }
              },
              required: ['accountName', 'bankCode', 'accountType', 'beneficiaryName', 'beneficiaryCpf', 'agencyNumber', 'accountNumber']
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Método de pagamento TED criado com sucesso.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/PaymentTedResponse'
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
    }
  },

  'api/payment-methods/{paymentMethodId}': {
    delete: {
      summary: 'Remove um método de pagamento',
      description: 'Exclui um método de pagamento associado a um usuário autenticado.',
      tags: ['Métodos de Pagamento'],
      parameters: [
        {
          name: 'paymentMethodId',
          in: 'path',
          required: true,
          description: 'ID do método de pagamento a ser removido.',
          schema: {
            type: 'string'
          }
        }
      ],
      responses: {
        204: {
          description: 'Método de pagamento removido com sucesso'
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
    }
  }
}
