import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDeleteuser } from '@/main/factories/use-cases/user/delete-user-factory'
import { DeleteUserController } from '@/presentation/controllers/user/delete-user-controller'
import { IController } from '@/presentation/interfaces'

export const makeDeleteUserController = (): IController => {
  const controller = new DeleteUserController(makeDeleteuser())
  return makeLogControllerDecorator(controller)
}
