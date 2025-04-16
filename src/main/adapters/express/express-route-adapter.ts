import { IController, IHttpRequest } from '@/presentation/interfaces'
import { Request, Response } from 'express'

export const expressRouteAdapter = (controller: IController) => {
  return async (req: Request, res: Response) => {
    const httpRequest: IHttpRequest = {
      headers: req.headers,
      pathParams: req.params,
      queryParams: req.query,
      body: req.body,
      userAuth: req.userAuth
    }

    const httpResponse = await controller.handle(httpRequest)

    if (httpResponse.body?.error instanceof Error) {
      res.status(httpResponse.statusCode).send({ error: httpResponse.body.error.message })
    } else {
      res.status(httpResponse.statusCode).send({ isCache: false, ...httpResponse.body })
    }
  }
}
