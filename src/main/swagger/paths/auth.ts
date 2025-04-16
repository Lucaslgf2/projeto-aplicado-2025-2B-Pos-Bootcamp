export const authPaths = {
  '/api/auth/facebook/callback': {
    post: {
      tags: ['Login OAuth'],
      summary: 'Autenticar usuário com Facebook OAuth',
      description: 'Endpoint para autenticação de usuário usando Facebook OAuth, retornando um token de autenticação.',
      parameters: [
        {
          name: 'code',
          in: 'query',
          required: true,
          schema: {
            type: 'string'
          },
          description: 'Código de autorização do Facebook OAuth obtido após o consentimento do usuário'
        }
      ],
      responses: {
        201: {
          description: 'Autenticação com Facebook bem-sucedida',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/FacebookAuthResponse'
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
  '/api/auth/forgot-password': {
    post: {
      tags: ['Login e Senha'],
      summary: 'Recuperar senha',
      description: 'Endpoint para iniciar o processo de recuperação de senha através do envio de um token para o email do usuário.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ForgotPasswordRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Token de recuperação gerado com sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ForgotPasswordResponse'
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
  '/api/auth/generate-oauth-url': {
    get: {
      tags: ['Login OAuth'],
      summary: 'Gerar URLs de autorização OAuth',
      description: 'Endpoint para obter as URLs de autorização para Google e Facebook OAuth.',
      responses: {
        201: {
          description: 'URLs de autorização geradas com sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GenerateOAuthUrlResponse'
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
  '/api/auth/google/callback': {
    post: {
      tags: ['Login OAuth'],
      summary: 'Autenticar usuário com Google OAuth',
      description: 'Endpoint para autenticação de usuário usando Google OAuth, retornando um token de autenticação.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/GoogleAuthRequest'
            }
          }
        }
      },
      responses: {
        201: {
          description: 'Autenticação com Google bem-sucedida',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/GoogleAuthResponse'
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
  '/api/auth/login': {
    post: {
      tags: ['Login e Senha'],
      summary: 'Realizar login de usuário',
      description: 'Endpoint para autenticar um usuário usando email e senha, retornando um token de autenticação.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/LoginRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Login bem-sucedido',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/LoginResponse'
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
          description: 'Não autorizado. Credenciais inválidas',
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
  '/api/auth/reset-password': {
    post: {
      tags: ['Login e Senha'],
      summary: 'Redefinir senha',
      description: 'Endpoint para redefinir a senha de um usuário utilizando o token de recuperação.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/ResetPasswordRequest'
            }
          }
        }
      },
      responses: {
        200: {
          description: 'Senha redefinida com sucesso',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ResetPasswordResponse'
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
  '/api/auth/resend-confirmation-email': {
    post: {
      tags: ['Login e Senha'],
      summary: 'Reenviar e-mail de confirmação',
      description: 'Reenvia o e-mail de confirmação para o usuário.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  format: 'email',
                  example: 'user@example.com'
                }
              },
              required: ['email']
            }
          }
        }
      },
      responses: {
        204: {
          description: 'Sem conteúdo - E-mail reenviado com sucesso.'
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
  '/api/auth/confirm-registration': {
    post: {
      tags: ['Login e Senha'],
      summary: 'Confirmação de Registro',
      description: 'Confirma o registro de um usuário utilizando seu ID e token.',
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                token: {
                  type: 'string',
                  description: 'Token de confirmação enviado ao usuário.'
                }
              },
              required: ['token']
            }
          }
        }
      },
      responses: {
        204: {
          description: 'Confirmação realizada com sucesso. Nenhum conteúdo retornado.'
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
  '/api/auth/update-password': {
    put: {
      tags: ['Login e Senha'],
      summary: 'Atualizar senha do usuário',
      description: 'Atualiza a senha de um usuário autenticado com base na senha antiga e nova senha.',
      security: [
        {
          bearerAuth: []
        }
      ],
      requestBody: {
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                oldPassword: {
                  type: 'string',
                  description: 'Senha antiga do usuário.'
                },
                newPassword: {
                  type: 'string',
                  description: 'Nova senha a ser configurada.'
                }
              },
              required: ['oldPassword', 'newPassword']
            }
          }
        }
      },
      responses: {
        204: {
          description: 'Senha atualizada com sucesso. Nenhum conteúdo retornado.'
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
          description: 'Não autorizado. Credenciais inválidas ou token ausente.',
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
