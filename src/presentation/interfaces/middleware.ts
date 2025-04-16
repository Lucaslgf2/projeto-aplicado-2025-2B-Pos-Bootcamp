import { IHttpRequest, IHttpResponse } from '@/presentation/interfaces/index'

export interface IMiddleware {
  handle: (httpRequest: IHttpRequest) => Promise<IHttpResponse>
}
