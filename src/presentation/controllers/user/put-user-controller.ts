import { ISetUser } from '@/domain/interfaces/use-cases/user-interface'
import ErrorHandler from '@/presentation/http/error-handler'
import { badRequest, noContent } from '@/presentation/http/http-status'
import { IController, IHttpRequest, IHttpResponse, IValidation } from '@/presentation/interfaces'

export class PutUserController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly setUser: ISetUser
  ) {}

  @ErrorHandler()
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const toValidate = { ...httpRequest.body, ...httpRequest.userAuth }
    const error = this.validation.validate(toValidate)
    if (error) {
      return badRequest(error)
    }

    const userId = httpRequest.userAuth.userId.value
    const { email, firstName, lastName, cpf, gender, phoneNumber, birthDate } = httpRequest.body

    await this.setUser.set({ userId, email, firstName, lastName, cpf, gender, phoneNumber, birthDate })
    return noContent()
  }
}
