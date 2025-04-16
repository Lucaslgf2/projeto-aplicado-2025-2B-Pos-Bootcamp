import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeSetUser } from '@/main/factories/use-cases/user/set-user-factory'
import { PutUserController } from '@/presentation/controllers/user/put-user-controller'
import { IController } from '@/presentation/interfaces'
import { makePutUserValidation } from './validation/put-user-validation-factory'

export const makedPutUserController = (): IController => {
  const controller = new PutUserController(makePutUserValidation(), makeSetUser())
  return makeLogControllerDecorator(controller)
}
