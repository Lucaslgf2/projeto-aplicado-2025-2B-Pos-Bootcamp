export const authSchemas = {
  FacebookAuthResponse: {
    type: 'object',
    properties: {
      token: {
        type: 'string',
        description: 'Token JWT para autenticação do usuário'
      }
    }
  },
  ForgotPasswordRequest: {
    type: 'object',
    required: ['email'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Endereço de email do usuário que solicitou a recuperação de senha'
      }
    }
  },
  ForgotPasswordResponse: {
    type: 'object',
    properties: {
      result: {
        type: 'string',
        description: 'Token de recuperação de senha gerado para o usuário'
      }
    }
  },
  GenerateOAuthUrlResponse: {
    type: 'object',
    properties: {
      google: {
        type: 'string',
        description: 'URL de autorização OAuth do Google'
      },
      facebook: {
        type: 'string',
        description: 'URL de autorização OAuth do Facebook'
      }
    }
  },
  GoogleAuthRequest: {
    type: 'object',
    required: ['code'],
    properties: {
      code: {
        type: 'string',
        description: 'Código de autorização do Google OAuth obtido após o consentimento do usuário'
      }
    }
  },
  GoogleAuthResponse: {
    type: 'object',
    properties: {
      token: {
        type: 'string',
        description: 'Token JWT para autenticação do usuário'
      }
    }
  },
  LoginRequest: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        format: 'email',
        description: 'Endereço de email do usuário para autenticação'
      },
      password: {
        type: 'string',
        description: 'Senha do usuário para autenticação'
      }
    }
  },
  LoginResponse: {
    type: 'object',
    properties: {
      userId: {
        type: 'string',
        description: 'Identificador único do usuário autenticado'
      },
      token: {
        type: 'string',
        description: 'Token JWT para autenticação do usuário'
      }
    }
  },
  ResetPasswordRequest: {
    type: 'object',
    required: ['userId', 'newPassword', 'resetToken'],
    properties: {
      userId: {
        type: 'string',
        description: 'Identificador único do usuário que está redefinindo a senha'
      },
      newPassword: {
        type: 'string',
        description: 'Nova senha que será configurada para o usuário'
      },
      resetToken: {
        type: 'string',
        description: 'Token de redefinição de senha recebido pelo usuário'
      }
    }
  },
  ResetPasswordResponse: {
    type: 'object',
    properties: {
      userId: {
        type: 'string',
        description: 'Identificador único do usuário que redefiniu a senha'
      }
    }
  },
  UpdatePasswordRequest: {
    type: 'object',
    required: ['oldPassword', 'newPassword'],
    properties: {
      oldPassword: {
        type: 'string',
        description: 'Senha antiga do usuário.'
      },
      newPassword: {
        type: 'string',
        description: 'Nova senha a ser configurada.'
      }
    }
  }
}
