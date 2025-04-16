import { IFindUser } from '@/domain/interfaces/use-cases/user-interface'
import { FindUser } from '@/domain/use-cases/user/find-user'
import { makeAddressRepository } from '@/main/factories/repositories/address-repository-factory'
import { makeInfluencerRepository } from '@/main/factories/repositories/influencer-repository-factory'
import { makeTopicRepository } from '@/main/factories/repositories/topic-repository-factory'
import { makeUserRepository } from '@/main/factories/repositories/user-repository-factory'

export const makeFindUser = (): IFindUser => {
  return new FindUser(makeUserRepository(), makeInfluencerRepository(), makeAddressRepository(), makeTopicRepository())
}
