import '@tests/mocks/auth-middleware-mock'

import { UserRepository } from '@/infra/adapters/knex/repositories/user-repository'
import { setupApp } from '@/main/adapters/express/config/app'
import { Express } from 'express'
import request from 'supertest'

describe('PutUserController', () => {
  let app: Express
  let executeQuerySpy: jest.SpyInstance

  beforeEach(() => {
    executeQuerySpy = jest.spyOn(UserRepository.prototype, 'selectById')
  })

  beforeAll(async () => {
    app = await setupApp()
  })

  afterEach(() => {
    executeQuerySpy.mockRestore()
  })

  test('Should return 204-NoContent if all fields including address are correct and user is updated', async () => {
    const response = await request(app)
      .put('/api/users')
      .set('Authorization', 'Bearer any_valid_token')
      .send({
        email: 'new_email@example.com',
        firstName: 'UpdatedFirstName',
        lastName: 'UpdatedLastName',
        gender: 'male',
        phoneNumber: '123456789',
        birthDate: '1990-01-01',
        acceptedTerms: true,
        address: {
          cep: '29311788',
          street: 'Updated Street',
          number: 123,
          city: 'Updated City',
          state: 'ES',
          complement: 'Apartment 101'
        }
      })
    expect(response.status).toBe(204)
  })

  test('Should return 404-NotFound if userId does not exist', async () => {
    executeQuerySpy.mockResolvedValueOnce(undefined)

    const response = await request(app)
      .put('/api/users')
      .set('Authorization', 'Bearer any_valid_token')
      .send({
        email: 'new_email@example.com',
        firstName: 'UpdatedFirstName',
        lastName: 'UpdatedLastName',
        gender: 'male',
        phoneNumber: '123456789',
        birthDate: '1990-01-01',
        acceptedTerms: true,
        address: {
          cep: '29311788',
          street: 'Updated Street',
          number: 123,
          city: 'Updated City',
          state: 'ES',
          complement: 'Apartment 101'
        }
      })

    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error', 'Usuário informado é inválido')
  })

  test('Should return 400-BadRequest if validation fails', async () => {
    const response = await request(app)
      .put('/api/users')
      .set('Authorization', 'Bearer any_valid_token')
      .send({
        email: 'invalid-email',
        firstName: 'UpdatedFirstName',
        lastName: 'UpdatedLastName',
        gender: 'any_gender',
        phoneNumber: 123456789,
        birthDate: 'x',
        acceptedTerms: 'true',
        address: {
          cep: '29311788',
          street: 'Updated Street',
          number: 123,
          city: 'Updated City',
          state: 'ES',
          complement: 'Apartment 101'
        }
      })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error')
  })
})
