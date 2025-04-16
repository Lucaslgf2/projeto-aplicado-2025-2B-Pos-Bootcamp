import loggerWinston from '@/main/adapters/winston/logger-winston'
import { LogControllerDecorator } from '@/main/decorators/log-controller-decorator'
import { IController } from '@/presentation/interfaces'

export const makeLogControllerDecorator = (controller: IController): IController => {
  return new LogControllerDecorator(controller, loggerWinston)
}
