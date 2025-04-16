import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeSaveUser } from '@/main/factories/use-cases/user/save-user-factory'
import { PostUserController } from '@/presentation/controllers/user/post-user-controller'
import { IController } from '@/presentation/interfaces'
import { makePostUserValidation } from './validation/post-user-validation-factory'

export const makePostUserController = (): IController => {
  const controller = new PostUserController(makePostUserValidation(), makeSaveUser())
  return makeLogControllerDecorator(controller)
}
