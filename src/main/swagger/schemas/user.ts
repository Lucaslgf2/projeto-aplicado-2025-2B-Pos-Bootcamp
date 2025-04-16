export const userSchemas = {
  GetUserResponse: {
    type: 'object',
    properties: {
      userId: {
        type: 'string',
        description: 'Identificador único do usuário.'
      },
      email: {
        type: 'string',
        format: 'email',
        description: 'Endereço de e-mail do usuário.'
      },
      userType: {
        type: 'string',
        description: 'Tipo de usuário (ex.: ADMIN, NORMAL).'
      },
      password: {
        type: 'string',
        nullable: true,
        description: 'Senha do usuário (oculta em respostas).'
      },
      previousPasswords: {
        type: 'array',
        items: {
          type: 'string'
        },
        nullable: true,
        description: 'Histórico de senhas anteriores.'
      },
      firstName: {
        type: 'string',
        description: 'Primeiro nome do influenciador.'
      },
      lastName: {
        type: 'string',
        description: 'Sobrenome do influenciador.'
      },
      cpf: {
        type: 'string',
        nullable: true,
        description: 'CPF do influenciador.'
      },
      gender: {
        type: 'string',
        description: 'Gênero do influenciador.'
      },
      phoneNumber: {
        type: 'string',
        description: 'Número de telefone.'
      },
      birthDate: {
        type: 'string',
        format: 'date',
        description: 'Data de nascimento.'
      },
      isVerified: {
        type: 'boolean',
        description: 'Indica se o influenciador foi verificado.'
      },
      acceptedTerms: {
        type: 'boolean',
        description: 'Indica se os termos foram aceitos.'
      },
      address: {
        type: 'object',
        nullable: true,
        properties: {
          addressId: {
            type: 'string',
            description: 'Identificador único do endereço.'
          },
          cep: {
            type: 'string',
            description: 'CEP do endereço.'
          },
          street: {
            type: 'string',
            description: 'Nome da rua.'
          },
          number: {
            type: 'integer',
            description: 'Número do endereço.'
          },
          city: {
            type: 'string',
            description: 'Cidade do endereço.'
          },
          state: {
            type: 'string',
            description: 'Estado do endereço.'
          },
          complement: {
            type: 'string',
            nullable: true,
            description: 'Complemento do endereço, se houver.'
          }
        },
        description: 'Dados do endereço do influenciador.'
      }
    }
  },

  CreateUserRequest: {
    type: 'object',
    required: ['email', 'password', 'firstName', 'lastName', 'gender', 'phoneNumber', 'birthDate', 'acceptedTerms'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Endereço de email do usuário'
      },
      password: {
        type: 'string',
        description: 'Senha do usuário'
      },
      firstName: {
        type: 'string',
        description: 'Primeiro nome do usuário'
      },
      lastName: {
        type: 'string',
        description: 'Sobrenome do usuário'
      },
      cpf: {
        type: 'string',
        description: 'CPF do usuário (Cadastro de Pessoa Física)',
        nullable: true // campo opcional
      },
      gender: {
        type: 'string',
        enum: ['male', 'female', 'non_binary', 'trans_male', 'trans_female', 'prefer_not_say'],
        description: 'Gênero do usuário'
      },
      phoneNumber: {
        type: 'string',
        description: 'Número de telefone do usuário'
      },
      birthDate: {
        type: 'string',
        format: 'date',
        description: 'Data de nascimento do usuário (formato ISO)'
      },
      acceptedTerms: {
        type: 'boolean',
        description: 'Indica se o usuário aceitou os termos e condições'
      }
    }
  },
  CreateUserResponse: {
    type: 'object',
    properties: {
      userId: {
        type: 'string',
        description: 'Identificador único do usuário'
      }
    }
  },

  UpdateUserRequest: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Email do usuário'
      },
      password: {
        type: 'string',
        description: 'Senha do usuário'
      },
      firstName: {
        type: 'string',
        description: 'Primeiro nome do usuário'
      },
      lastName: {
        type: 'string',
        description: 'Sobrenome do usuário'
      },
      cpf: {
        type: 'string',
        description: 'CPF do usuário'
      },
      gender: {
        type: 'string',
        enum: ['male', 'female', 'non_binary', 'trans_male', 'trans_female', 'prefer_not_say'],
        description: 'Gênero do usuário'
      },
      phoneNumber: {
        type: 'string',
        description: 'Número de telefone do usuário'
      },
      birthDate: {
        type: 'string',
        format: 'date',
        description: 'Data de nascimento do usuário (formato ISO)'
      },
      acceptedTerms: {
        type: 'boolean',
        description: 'Confirmação de aceitação dos termos de uso'
      },
      address: {
        type: 'object',
        required: ['cep', 'street', 'number', 'city', 'state'], // Campos obrigatórios para endereço
        properties: {
          cep: {
            type: 'string',
            description: 'CEP do endereço'
          },
          street: {
            type: 'string',
            description: 'Logradouro do endereço'
          },
          number: {
            type: 'string',
            description: 'Número do endereço'
          },
          city: {
            type: 'string',
            description: 'Cidade do endereço'
          },
          state: {
            type: 'string',
            description: 'Estado do endereço'
          },
          complement: {
            type: 'string',
            description: 'Complemento do endereço',
            nullable: true
          }
        }
      }
    }
  }
}
