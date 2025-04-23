import { IFindUser } from '@/domain/interfaces/use-cases/user-interface'
import ErrorHandler from '@/presentation/http/error-handler'
import { ok } from '@/presentation/http/http-status'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/interfaces'

export class GetUserController implements IController {
  constructor(private readonly findUser: IFindUser) {}

  @ErrorHandler()
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const userId = httpRequest.userAuth.userId
    const result = await this.findUser.find({ userId })
    return ok(result)
  }
}
