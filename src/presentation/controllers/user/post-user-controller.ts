import { ISaveUser } from '@/domain/interfaces/use-cases/user-interface'
import ErrorHandler from '@/presentation/http/error-handler'
import { badRequest, created } from '@/presentation/http/http-status'
import { IController, IHttpRequest, IHttpResponse, IValidation } from '@/presentation/interfaces'

export class PostUserController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly saveUser: ISaveUser
  ) {}

  @ErrorHandler()
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }

    const { email, password, firstName, lastName, cpf, gender, phoneNumber, birthDate } = httpRequest.body

    const result = await this.saveUser.save({ email, password, firstName, lastName, cpf, gender, phoneNumber, birthDate })
    return created(result)
  }
}
