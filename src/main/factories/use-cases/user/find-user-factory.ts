import { IFindUser } from '@/domain/interfaces/use-cases/user-interface'
import { FindUser } from '@/domain/use-cases/user/find-user'
import { makeUserRepository } from '@/main/factories/repositories/user-repository-factory'

export const makeFindUser = (): IFindUser => {
  return new FindUser(makeUserRepository())
}
