import { ISaveUser } from '@/domain/interfaces/use-cases/user-interface'
import { SaveUser } from '@/domain/use-cases/user/save-user'
import { makeEnvVariables } from '@/main/config/env-variables'
import { makeBCryptAdapter } from '@/main/factories/adapters/bcrypt-adapter-factory'
import { makeJwtAdapter } from '@/main/factories/adapters/jwt-adapter-factory'
import { makeNodeMailerAdapter } from '@/main/factories/adapters/nodemailer-adapter-factory'
import { makePasswordRepository } from '@/main/factories/repositories/password-repository-factory'
import { makeUserRepository } from '@/main/factories/repositories/user-repository-factory'

export const makeSaveUser = (): ISaveUser => {
  const envVariables = makeEnvVariables()
  return new SaveUser(makeUserRepository(), makeBCryptAdapter(), makePasswordRepository(), makeJwtAdapter(envVariables.jwtSecret), envVariables.front.url, makeNodeMailerAdapter())
}
