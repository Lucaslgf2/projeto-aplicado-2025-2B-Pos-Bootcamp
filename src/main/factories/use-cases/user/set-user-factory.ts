import { ISetUser } from '@/domain/interfaces/use-cases/user-interface'
import { SetUser } from '@/domain/use-cases/user/set-user'
import { makeAddressRepository } from '@/main/factories/repositories/address-repository-factory'
import { makeInfluencerRepository } from '@/main/factories/repositories/influencer-repository-factory'
import { makeUserRepository } from '@/main/factories/repositories/user-repository-factory'
import { makeIndexInfluencer } from '@/main/factories/use-cases/search/index-influencer-factory'

export const makeSetUser = (): ISetUser => {
  return new SetUser(makeUserRepository(), makeInfluencerRepository(), makeAddressRepository(), makeIndexInfluencer())
}
