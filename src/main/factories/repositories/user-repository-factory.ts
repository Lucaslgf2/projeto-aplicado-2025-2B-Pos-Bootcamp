import { IUserRepo } from '@/domain/interfaces/repositories/user-repo-interface'
import { UserRepository } from '@/infra/adapters/knex/repositories/user-repository'

export const makeUserRepository = (): IUserRepo => {
  return new UserRepository()
}
