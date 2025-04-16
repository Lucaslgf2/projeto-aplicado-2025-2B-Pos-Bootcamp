export const paymentSchemas = {
  PaymentMethod: {
    type: 'object',
    properties: {
      paymentMethodId: {
        type: 'string',
        format: 'uuid',
        description: 'Identificador único do método de pagamento.'
      },
      userId: {
        type: 'string',
        format: 'uuid',
        description: 'Identificador único do usuário.'
      },
      accountName: {
        type: 'string',
        description: 'Nome associado à conta.'
      },
      isDefault: {
        type: 'boolean',
        description: 'Indica se o método de pagamento é o padrão.'
      },
      type: {
        type: 'string',
        enum: ['PIX', 'TED'],
        description: 'Tipo do método de pagamento.'
      },
      details: {
        oneOf: [{ $ref: '#/components/schemas/PixDetail' }, { $ref: '#/components/schemas/TedDetail' }],
        description: 'Detalhes específicos do método de pagamento.'
      }
    },
    required: ['paymentMethodId', 'userId', 'accountName', 'isDefault', 'type']
  },

  PixDetail: {
    type: 'object',
    properties: {
      pixKey: {
        type: 'string',
        description: 'Chave PIX do método de pagamento.'
      }
    },
    required: ['pixKey']
  },
  TedDetail: {
    type: 'object',
    properties: {
      agency: {
        type: 'string',
        description: 'Agência bancária para TED.'
      },
      account: {
        type: 'string',
        description: 'Conta bancária para TED.'
      }
    },
    required: ['agency', 'account']
  },

  PaymentPixRequest: {
    type: 'object',
    properties: {
      accountName: {
        type: 'string',
        description: 'Nome associado à conta PIX.'
      },
      isDefault: {
        type: 'boolean',
        description: 'Indica se o método PIX será o padrão.'
      },
      keyType: {
        type: 'string',
        enum: ['CPF', 'EMAIL', 'PHONE', 'RANDOM'],
        description: 'Tipo da chave PIX.'
      },
      keyValue: {
        type: 'string',
        description: 'Valor da chave PIX.'
      }
    },
    required: ['accountName', 'keyType', 'keyValue']
  },
  PaymentPixResponse: {
    type: 'object',
    properties: {
      PaymentPixId: {
        type: 'string',
        format: 'uuid',
        description: 'Identificador único do método de pagamento PIX criado.'
      }
    },
    required: ['PaymentPixId']
  },

  PaymentTedRequest: {
    type: 'object',
    properties: {
      accountName: {
        type: 'string',
        description: 'Nome associado à conta TED.'
      },
      isDefault: {
        type: 'boolean',
        description: 'Indica se o método TED será o padrão.'
      },
      bankCode: {
        type: 'integer',
        description: 'Código do banco.'
      },
      accountType: {
        type: 'string',
        enum: ['checking', 'savings'],
        description: 'Tipo de conta (corrente ou poupança).'
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
        description: 'Número da conta.'
      }
    },
    required: ['accountName', 'isDefault', 'bankCode', 'accountType', 'beneficiaryName', 'beneficiaryCpf', 'agencyNumber', 'accountNumber']
  },
  PaymentTedResponse: {
    type: 'object',
    properties: {
      PaymentTedId: {
        type: 'string',
        format: 'uuid',
        description: 'Identificador único do método de pagamento TED criado.'
      }
    },
    required: ['PaymentTedId']
  }
}
