import '@tests/mocks/auth-middleware-mock'

import { setupApp } from '@/main/adapters/express/config/app'
import { Express } from 'express'
import request from 'supertest'

describe('PostConfirmRegistrationController', () => {
  let app: Express

  beforeAll(async () => {
    app = await setupApp()
  })

  test('Should return 200-OK', async () => {
    const userId = globalThis.testUserId
    const confirmToken = globalThis.testConfirmToken

    const response = await request(app).post('/api/auth/confirm-registration').set('Authorization', 'Bearer any_valid_token').send({
      userId,
      token: confirmToken
    })

    expect(response.status).toBe(204)
    expect(response.body).toEqual({})
  })
})
