import { IWinstonLogger } from '@/main/adapters/winston/logger-winston'
import { IController, IHttpRequest, IHttpResponse } from '@/presentation/interfaces'

export class LogControllerDecorator implements IController {
  constructor(
    private readonly controller: IController,
    private readonly loggerWinston: IWinstonLogger
  ) {}

  async handle(httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const httpResponse = await this.controller.handle(httpRequest)
    this.loggerWinston.info('httpRequest/httpResponse', { httpRequest, httpResponse })

    if (httpResponse.statusCode < 200 || httpResponse.statusCode > 299) {
      this.loggerWinston.error('httpError - ', httpResponse.body.error)
    }

    return httpResponse
  }
}
