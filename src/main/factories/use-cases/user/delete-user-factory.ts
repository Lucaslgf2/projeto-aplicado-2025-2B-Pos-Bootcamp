import { IDeleteUser } from '@/domain/interfaces/use-cases/user-interface'
import { DeleteUser } from '@/domain/use-cases/user/delete-user'
import { makeUserRepository } from '@/main/factories/repositories/user-repository-factory'
import { makeInfluencerRepository } from '@/main/factories/repositories/influencer-repository-factory'

export const makeDeleteuser = (): IDeleteUser => {
  return new DeleteUser(makeUserRepository(), makeInfluencerRepository())
}
