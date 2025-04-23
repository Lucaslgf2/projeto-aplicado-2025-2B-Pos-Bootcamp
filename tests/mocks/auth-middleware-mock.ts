import { UUID } from '@/domain/entities/uuid'
import { unauthorized } from '@/presentation/http/http-status'
import { IHttpRequest, IHttpResponse } from '@/presentation/interfaces'

jest.mock('@/presentation/middlewares/auth-middleware', () => {
  return {
    AuthMiddleware: jest.fn().mockImplementation(() => {
      return {
        handle: async (httpRequest: IHttpRequest): Promise<IHttpResponse> => {
          if (httpRequest.headers.authorization === 'Bearer any_valid_token') {
            return {
              statusCode: 200,
              body: {
                userAuth: {
                  userId: new UUID(globalThis.testUserId),
                  email: 'mock_user_email@example.com'
                  //userType: UserTypeEnum.Influencer
                }
              }
            }
          } else {
            return unauthorized()
          }
        }
      }
    })
  }
})
