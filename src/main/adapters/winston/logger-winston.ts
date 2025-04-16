import { cloneDeep } from 'lodash'
import winston from 'winston'

export interface IWinstonLogger extends winston.Logger {}

const level = process.env.NODE_ENV === 'test' ? 'error' : 'info'
const silent = process.env.NODE_ENV === 'test'

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
}

const transports = [new winston.transports.Console({ level })]

const replacer = (_key: string, value: any): any => {
  if (value) {
    const items = ['httpRequest', 'httpResponse']
    const keys = Object.keys(value as object)
    const keysFilter = keys.filter((key) => items.includes(key))
    if (keysFilter.length > 0) {
      const newValue = cloneDeep(value)
      for (const item of items) {
        if (newValue[item]) {
          const keysItem = Object.keys(newValue[item] as object)
          for (const keyItem of keysItem) {
            if (typeof newValue[item][keyItem] === 'object') {
              newValue[item][keyItem] = JSON.stringify(newValue[item][keyItem]).replaceAll('"', '')
            }
          }
        }
      }
      return newValue
    }
    return value
  }
}

const format = winston.format.combine(
  winston.format((info) => {
    info.message = `[Projeto-Aplicado-POS-EAD] - ${String(info.message)}`
    return info
  })(),
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.json({ replacer })
)

winston.addColors(colors)
const loggerWinston = winston.createLogger({
  level,
  silent,
  levels,
  transports,
  format
})

export default loggerWinston
