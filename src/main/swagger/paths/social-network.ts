export const socialNetworkPaths = {
  '/auth/generate-tiktok-url': {
    get: {
      tags: ['Redes sociais'],
      summary: 'Gerar URL de autorização do TikTok OAuth',
      description: 'Gera a URL para autenticação do usuário no TikTok usando OAuth.',
      security: [
        {
          bearerAuth: []
        }
      ],
      responses: {
        200: {
          description: 'URL de autorização gerada com sucesso',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  url: {
                    type: 'string',
                    example: 'https://www.tiktok.com/v2/auth/authorize/?...'
                  }
                }
              }
            }
          }
        },
        401: {
          description: 'Não autorizado',
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
  '/auth/tik-tok/callback': {
    get: {
      tags: ['Redes sociais'],
      summary: 'Processar callback do TikTok OAuth',
      description: 'Processa o callback do TikTok OAuth e armazena os dados do usuário.',
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          name: 'code',
          in: 'query',
          required: true,
          schema: {
            type: 'string'
          },
          description: 'Código de autorização recebido após o consentimento do usuário.'
        }
      ],
      responses: {
        201: {
          description: 'Callback processado e dados armazenados com sucesso.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/TikTokAuthResponse'
              }
            }
          }
        },
        400: {
          description: 'Parâmetros inválidos',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Não autorizado',
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
  '/social-networks/{userId}': {
    get: {
      tags: ['Redes sociais'],
      summary: 'Listar redes sociais vinculadas ao usuário',
      description: 'Retorna os dados das redes sociais vinculadas a um usuário específico.',
      security: [
        {
          bearerAuth: []
        }
      ],
      parameters: [
        {
          name: 'userId',
          in: 'path',
          required: true,
          schema: {
            type: 'string'
          },
          description: 'ID do usuário cujas redes sociais serão listadas.'
        }
      ],
      responses: {
        200: {
          description: 'Dados das redes sociais vinculadas ao usuário.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  isCache: {
                    type: 'boolean',
                    description: 'Indica se os dados são provenientes de cache.',
                    example: false
                  },
                  data: {
                    type: 'object',
                    additionalProperties: true,
                    description: 'Dados das redes sociais do usuário.',
                    example: {
                      instagramUsername: 'username_insta',
                      tiktokUsername: 'username_tiktok'
                    }
                  }
                }
              }
            }
          }
        },
        404: {
          description: 'Usuário ou redes sociais não encontrados.',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ErrorResponse'
              }
            }
          }
        },
        401: {
          description: 'Não autorizado',
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
