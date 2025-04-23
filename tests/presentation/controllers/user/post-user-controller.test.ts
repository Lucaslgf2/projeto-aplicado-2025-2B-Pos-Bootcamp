import { NodeMailerAdapter } from '@/infra/adapters/nodemailer/nodemailer-adapter'
import { setupApp } from '@/main/adapters/express/config/app'
import { Express } from 'express'
import request from 'supertest'

describe('PostUserController', () => {
  let app: Express

  beforeAll(async () => {
    app = await setupApp()
  })

  const requiredParams = ['email', 'password', 'firstName', 'lastName', 'gender', 'phoneNumber', 'birthDate', 'acceptedTerms']
  requiredParams.forEach((param) => {
    test(`Should return 400-BadRequest if an "${param}" is not provided`, async () => {
      const body: Record<string, any> = {}
      for (const p of requiredParams) {
        body[p] = p === param ? undefined : `any_${p}`
      }
      const response = await request(app).post('/api/users').send(body)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error', `Parâmetro ausente: ${param}`)
    })
  })

  test('Should return 201-Created if all required parameters are correct.', async () => {
    const sendEmailSpy = jest.spyOn(NodeMailerAdapter.prototype, 'sendEmail')

    const response = await request(app).post('/api/users').send({
      email: 'any_email@example.com',
      password: 'any_password',
      firstName: 'any_firstName',
      lastName: 'any_lastName',
      cpf: '41811398081',
      gender: 'male',
      phoneNumber: 'any_phoneNumber',
      birthDate: '1990-01-01',
      isVerified: true,
      acceptedTerms: true
    })
    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('data.userId')

    expect(sendEmailSpy).toHaveBeenCalled()
    expect(sendEmailSpy).toHaveBeenCalledTimes(1)
    expect(sendEmailSpy.mock.calls[0][0].to[0].address).toBe('any_email@example.com')

    sendEmailSpy.mockRestore()
  })

  test('Should return 400-BadRequest if the email provided is already registered in the database', async () => {
    const response = await request(app).post('/api/users').send({
      email: 'any_email@example.com',
      password: 'any_password',
      firstName: 'any_firstName',
      lastName: 'any_lastName',
      cpf: '41811398081',
      gender: 'male',
      phoneNumber: 'any_phoneNumber',
      birthDate: '1990-01-01',
      isVerified: true,
      acceptedTerms: true
    })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('error', 'Email informado é inválido')
  })
})
