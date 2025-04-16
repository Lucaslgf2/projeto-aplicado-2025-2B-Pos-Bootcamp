import { IDeleteUser } from '@/domain/interfaces/use-cases/user-interface'
import ErrorHandler from '@/presentation/http/error-handler'
import { ok } from '@/presentation/http/http-status'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/interfaces'

export class DeleteUserController implements IController {
  constructor(private readonly deleteUser: IDeleteUser) {}

  @ErrorHandler()
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { userId } = httpRequest.pathParams

    await this.deleteUser.delete({ userId })
    return ok({ message: 'Usuário deletado com sucesso!' })
  }
}
