import { IPasswordRepo } from '@/domain/interfaces/repositories/password-repo-interface'
import { PasswordRepository } from '@/infra/adapters/knex/repositories/password-repository'

export const makePasswordRepository = (): IPasswordRepo => {
  return new PasswordRepository()
}
