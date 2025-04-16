import { BussinessError } from '@/domain/entities/errors/abstract-bussiness-error'
import { IAuthToken } from '@/domain/interfaces/criptography/auth-token-interface'
import { serverError500, unauthorized } from '@/presentation/http/http-status'
import { IHttpRequest, IHttpResponse, IMiddleware, IValidation } from '@/presentation/interfaces'

export class AuthMiddleware implements IMiddleware {
  constructor(
    private readonly validation: IValidation,
    private readonly authToken: IAuthToken
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.headers)
      if (error) {
        return unauthorized()
      }

      const { authorization } = httpRequest.headers
      const bearer = authorization.split(' ')
      const bearerToken: string = bearer[1]

      const userAuth = await this.authToken.verifyToken(bearerToken)
      if (userAuth) {
        return {
          statusCode: 200,
          body: { userAuth }
        }
      }

      return unauthorized()
    } catch (error) {
      if (error instanceof BussinessError) {
        return unauthorized(error)
      }
      return serverError500(new Error(JSON.stringify(error)))
    }
  }
}
