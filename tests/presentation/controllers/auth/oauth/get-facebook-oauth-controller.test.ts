import { OAuthInvalidEmailError, OAuthTokenRetrievalError } from '@/domain/entities/errors/oauth-provider-error'
import { ProviderEnum } from '@/domain/entities/types-and-enums'
import { setupApp } from '@/main/adapters/express/config/app'
import { Express } from 'express'
import nock from 'nock'
import request from 'supertest'

describe('GetFacebookOAuthController', () => {
  let app: Express

  beforeAll(async () => {
    app = await setupApp()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  test('Should return a valid auth token when given a valid code', async () => {
    nock('https://graph.facebook.com').get('/oauth/access_token').query(true).reply(200, { access_token: 'mock_facebook_access_token' })

    nock('https://graph.facebook.com').get('/me').query(true).reply(200, { id: 'mock_user_id_facebook', email: 'mock_user_email@facebook.com', name: 'mock_user_name_facebook' })

    const response = await request(app).get('/api/auth/facebook/callback').query({ code: 'mock_valid_facebook_code' })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data.token')
  })

  test('Should return 401 for invalid token', async () => {
    nock('https://graph.facebook.com').get('/oauth/access_token').query(true).reply(400, { error: 'invalid_request' })

    const response = await request(app).get('/api/auth/facebook/callback').query({ code: 'mock_invalid_facebook_code' })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error', new OAuthTokenRetrievalError(ProviderEnum.Facebook, 'mock_invalid_facebook_code').message)
  })

  test('Should handle errors when no email is found', async () => {
    nock('https://graph.facebook.com').get('/oauth/access_token').query(true).reply(200, { access_token: 'mock_facebook_access_token' })

    nock('https://graph.facebook.com').get('/me').query(true).reply(200, { id: 'mock_user_id_facebook', email: undefined, name: 'mock_user_name_facebook' })

    const response = await request(app).get('/api/auth/facebook/callback').query({ code: 'mock_facebook_code_without_email' })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error', new OAuthInvalidEmailError(ProviderEnum.Facebook).message)
  })
})
