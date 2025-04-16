import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeLoginAuthentication } from '@/main/factories/use-cases/login/login-authentication-factory'
import { PostLoginController } from '@/presentation/controllers/auth/login/post-login-controller'
import { IController } from '@/presentation/interfaces'
import { makePostLoginValidation } from './validation/post-login-validation-factory'

export const makePostLoginController = (): IController => {
  const controller = new PostLoginController(makePostLoginValidation(), makeLoginAuthentication())
  return makeLogControllerDecorator(controller)
}
