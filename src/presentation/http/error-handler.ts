import { BussinessError } from '@/domain/entities/errors/abstract-bussiness-error'
import { InvalidCredentialsError } from '@/domain/entities/errors/invalid-credentials-error'
import loggerWinston from '@/main/adapters/winston/logger-winston'
import { ServerError } from '@/presentation/errors'
import { badRequest, serverError500, unauthorized } from '@/presentation/http/http-status'

export default function ErrorHandler(): any {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const fn = descriptor.value
    descriptor.value = async function (...args: any[]) {
      try {
        return await fn.apply(this, args)
      } catch (error) {
        loggerWinston.error('errorHandler - ', error)
        if (error instanceof BussinessError) {
          if (error instanceof InvalidCredentialsError) {
            return unauthorized(error)
          } else {
            return badRequest(error)
          }
        }
        return serverError500(new ServerError(error as string))
      }
    }
  }
}
