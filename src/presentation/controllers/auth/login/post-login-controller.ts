import { ILoginAuthentication } from '@/domain/interfaces/use-cases/login-interface'
import ErrorHandler from '@/presentation/http/error-handler'
import { badRequest, ok, unauthorized } from '@/presentation/http/http-status'
import { IController, IHttpRequest, IHttpResponse, IValidation } from '@/presentation/interfaces'

export class PostLoginController implements IController {
  constructor(
    private readonly validation: IValidation,
    private readonly loginAuthentication: ILoginAuthentication
  ) {}

  @ErrorHandler()
  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }

    const { email, password } = httpRequest.body

    const token = await this.loginAuthentication.authUser({ email, password })
    return token ? ok(token) : unauthorized()
  }
}
