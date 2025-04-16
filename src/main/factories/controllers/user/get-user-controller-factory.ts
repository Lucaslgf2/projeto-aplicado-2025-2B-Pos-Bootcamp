import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeFindUser } from '@/main/factories/use-cases/user/find-user-factory'
import { GetUserController } from '@/presentation/controllers/user/get-user-controller'
import { IController } from '@/presentation/interfaces'

export const makeGetUserController = (): IController => {
  const controller = new GetUserController(makeFindUser())
  return makeLogControllerDecorator(controller)
}
