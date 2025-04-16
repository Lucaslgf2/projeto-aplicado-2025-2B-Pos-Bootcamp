import { expressMiddlewareAdapter } from '@/main/adapters/express/express-middleware-adapter'
import { makeEnvVariables } from '@/main/config/env-variables'
import { makeJwtAdapter } from '@/main/factories/adapters/jwt-adapter-factory'
import { IMiddleware } from '@/presentation/interfaces'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { makeAuthMiddlewareValidation } from './validation/auth-middleware-validation-factory'

const makeAuthMiddleware = (): IMiddleware => {
  const envVariables = makeEnvVariables()
  return new AuthMiddleware(makeAuthMiddlewareValidation(), makeJwtAdapter(envVariables.jwtSecret))
}

export const authMiddleware = expressMiddlewareAdapter(makeAuthMiddleware())
