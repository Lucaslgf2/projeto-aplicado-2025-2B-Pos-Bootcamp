import { setupApp } from '@/main/adapters/express/config/app'
import { Express } from 'express'
import request from 'supertest'

describe('PostLoginController', () => {
  let app: Express

  beforeAll(async () => {
    app = await setupApp()
  })

  test('Should return 400-BadRequest if an "email" is not provided', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: undefined,
      password: 'any_password'
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error', 'Parâmetro ausente: email')
  })

  test('Should return 400-BadRequest if an "password" is not provided', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'any_email@example.com',
      password: undefined
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error', 'Parâmetro ausente: password')
  })

  test('Should return 200-OK if a valid "email" and "password" are provided', async () => {
    const postUserResult = await request(app).post('/api/users').send({
      email: 'any_email@example.com',
      password: 'correct_password',
      firstName: 'any_firstName',
      lastName: 'any_lastName',
      cpf: '41811398081',
      gender: 'male',
      phoneNumber: 'any_phoneNumber',
      birthDate: '1990-01-01',
      isVerified: true,
      acceptedTerms: true
    })

    await request(app).post('/api/auth/confirm-registration').send({
      token: postUserResult.body.data.confirmToken
    })

    const response = await request(app).post('/api/auth/login').send({
      email: 'any_email@example.com',
      password: 'correct_password'
    })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('data.token')
  })

  test('Should return 401-Unauthorized if an invalid "email" is provided', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'incorrect_email@example.com',
      password: 'correct_password'
    })
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error', 'Credenciais inválidas! Tente novamente')
  })

  test('Should return 401-Unauthorized if an invalid "password" is provided', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'any_email@example.com',
      password: 'incorrect_password'
    })
    expect(response.status).toBe(401)
    expect(response.body).toHaveProperty('error', 'Credenciais inválidas! Tente novamente')
  })
})
