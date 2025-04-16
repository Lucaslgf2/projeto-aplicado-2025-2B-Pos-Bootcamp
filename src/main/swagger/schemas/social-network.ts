export const SocialNetworkSchemas = {
  TikTokAuthResponse: {
    type: 'object',
    properties: {
      tiktokUserId: {
        type: 'string',
        example: '1234567890123456789'
      },
      accessToken: {
        type: 'string',
        example: 'act.aBcDeFg12345'
      },
      accessTokenExpiresAt: {
        type: 'string',
        format: 'date-time',
        example: '2024-11-25T12:00:00Z'
      },
      refreshToken: {
        type: 'string',
        example: 'rft.XyZ123456'
      },
      refreshTokenExpiresAt: {
        type: 'string',
        format: 'date-time',
        example: '2025-11-25T12:00:00Z'
      }
    }
  },
  ErrorResponse: {
    type: 'object',
    properties: {
      error: {
        type: 'string',
        example: 'Invalid parameters'
      }
    }
  }
}
