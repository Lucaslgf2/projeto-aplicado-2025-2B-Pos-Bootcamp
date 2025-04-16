import { ISetUser } from '@/domain/interfaces/use-cases/user-interface'
import { SetUser } from '@/domain/use-cases/user/set-user'
import { makeUserRepository } from '@/main/factories/repositories/user-repository-factory'

export const makeSetUser = (): ISetUser => {
  return new SetUser(makeUserRepository())
}
