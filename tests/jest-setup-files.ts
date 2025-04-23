/* eslint-disable no-console -- Motivo: blablabla */

import '@tests/mocks/auth-middleware-mock'

import { GenderEnum } from '@/domain/entities/types-and-enums'
import { KnexSingletonConnection } from '@/infra/adapters/knex/knex-singleton-connection'
import { makeSaveUser } from '@/main/factories/use-cases/user/save-user-factory'

console.log('Running jest-setup-files..\n')

beforeAll(async () => {
  const result = await makeSaveUser().save({
    email: 'mock_user_email@example.com',
    password: 'any_password',
    firstName: 'any_firstName',
    lastName: 'any_lastName',
    cpf: '11111111111',
    gender: GenderEnum.PreferNotSay,
    phoneNumber: 'any_phoneNumber',
    birthDate: new Date('1990-01-01')
  })

  globalThis.testUserId = result.userId
  globalThis.testConfirmToken = result.confirmToken
})

afterAll(async () => {
  const db = KnexSingletonConnection.getInstance()
  const tables = await db.raw("SELECT tablename FROM pg_tables WHERE 1=1 AND schemaname='public' AND tablename NOT LIKE '%knex%'")
  for (const { tablename } of tables.rows) {
    await db.raw(`TRUNCATE TABLE "${tablename}" RESTART IDENTITY CASCADE`)
  }
})
