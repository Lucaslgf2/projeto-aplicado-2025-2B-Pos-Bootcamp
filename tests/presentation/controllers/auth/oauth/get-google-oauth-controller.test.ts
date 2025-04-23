import { OAuthInvalidEmailError, OAuthTokenRetrievalError } from '@/domain/entities/errors/oauth-provider-error'
import { ProviderEnum } from '@/domain/entities/types-and-enums'
import { setupApp } from '@/main/adapters/express/config/app'
import { Express } from 'express'
import nock from 'nock'
import request from 'supertest'

describe('GetGoogleOAuthController', () => {
  let app: Express

  beforeAll(async () => {
    app = await setupApp()
  })

  afterEach(() => {
    nock.cleanAll()
  })

  test('Should return a valid auth token when given a valid code', async () => {
    nock('https://oauth2.googleapis.com').post('/token').query(true).reply(200, { access_token: 'mock_google_access_token' })

    nock('https://www.googleapis.com').get('/oauth2/v2/userinfo').query(true).reply(200, { id: 'mock_user_id_google', email: 'mock_user_email@google.com', name: 'mock_user_name_google' })

    const response = await request(app).get('/api/auth/google/callback').query({ code: 'mock_valid_google_code' })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data.token')
  })

  test('Should handle errors if the code is invalid', async () => {
    nock('https://oauth2.googleapis.com').post('/token').query(true).reply(400, { error: 'invalid_request' })

    const response = await request(app).get('/api/auth/google/callback').query({ code: 'mock_invalid_google_code' })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error', new OAuthTokenRetrievalError(ProviderEnum.Google, 'mock_invalid_google_code').message)
  })

  test('Should return 400 when no email is provided by the API', async () => {
    nock('https://oauth2.googleapis.com').post('/token').query(true).reply(200, { access_token: 'mock_google_access_token' })

    nock('https://www.googleapis.com').get('/oauth2/v2/userinfo').query(true).reply(200, { id: 'mock_user_id_google', email: undefined, name: 'mock_user_name_google' })

    const response = await request(app).get('/api/auth/google/callback').query({ code: 'mock_google_code_without_email' })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error', new OAuthInvalidEmailError(ProviderEnum.Google).message)
  })
})
