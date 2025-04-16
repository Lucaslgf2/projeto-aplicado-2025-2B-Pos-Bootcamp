import { IHttpRequest, IMiddleware } from '@/presentation/interfaces'
import { NextFunction, Request, Response } from 'express'

export const expressMiddlewareAdapter = (middleware: IMiddleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: IHttpRequest = { headers: req.headers, userAuth: req.userAuth }
    const { statusCode, body } = await middleware.handle(httpRequest)
    if (statusCode === 200) {
      Object.assign(req, body)
      next()
    } else {
      res.status(statusCode).send({ error: body.error.message })
    }
  }
}
