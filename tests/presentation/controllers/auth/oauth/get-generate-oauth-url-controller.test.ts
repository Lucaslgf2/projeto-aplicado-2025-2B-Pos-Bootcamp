import { setupApp } from '@/main/adapters/express/config/app'
import { Express } from 'express'
import request from 'supertest'

describe('GetGenerateOAuthUrlController', () => {
  let app: Express

  beforeAll(async () => {
    app = await setupApp()
  })

  test('Should return OAuth URLs for Google and Facebook', async () => {
    const response = await request(app).get('/api/auth/generate-oauth-url')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data.google')
    expect(response.body).toHaveProperty('data.facebook')
  })
})
