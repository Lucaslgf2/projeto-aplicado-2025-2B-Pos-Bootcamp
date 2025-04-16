import { ILoginAuthentication } from '@/domain/interfaces/use-cases/login-interface'
import { LoginAuthentication } from '@/domain/use-cases/login/login-authentication'
import { makeEnvVariables } from '@/main/config/env-variables'
import { makeBCryptAdapter } from '@/main/factories/adapters/bcrypt-adapter-factory'
import { makeJwtAdapter } from '@/main/factories/adapters/jwt-adapter-factory'
import { makeInfluencerRepository } from '@/main/factories/repositories/influencer-repository-factory'
import { makeUserRepository } from '@/main/factories/repositories/user-repository-factory'

export const makeLoginAuthentication = (): ILoginAuthentication => {
  const envVariables = makeEnvVariables()
  return new LoginAuthentication(makeUserRepository(), makeInfluencerRepository(), makeBCryptAdapter(), makeJwtAdapter(envVariables.jwtSecret))
}
