/* eslint-disable @typescript-eslint/explicit-function-return-type -- Motivo: blablabla */

import 'dotenv-flow/config'

type GetEnvOptions<T = string> = { allowedValues?: readonly T[] }
function getFromEnv<T extends string>(key: string, options?: GetEnvOptions<T>): T {
  const value = process.env[key]
  if (process.env.NODE_ENV !== 'test') {
    if (value === undefined) {
      throw new Error(`Missing env variable: ${key}`)
    }
    if (options?.allowedValues !== undefined && !options.allowedValues.includes(value as T)) {
      throw new Error(`Invalid value for env variable: ${key}`)
    }
  }
  return value as T
}

export const makeEnvVariables = () => {
  return {
    node: {
      env: getFromEnv('NODE_ENV')
    },
    app: {
      name: getFromEnv('APP_NAME'),
      port: Number(getFromEnv('APP_PORT')),
      url: getFromEnv('APP_URL')
    },
    db: {
      host: getFromEnv('DATABASE_HOST'),
      port: Number(getFromEnv('DATABASE_PORT')),
      name: getFromEnv('DATABASE_NAME'),
      user: getFromEnv('DATABASE_USER'),
      password: getFromEnv('DATABASE_PASSWORD')
    },
    mail: {
      fromAddress: getFromEnv('MAIL_FROM_ADDRESS'),
      host: getFromEnv('MAIL_HOST'),
      port: Number(getFromEnv('MAIL_PORT')),
      secure: getFromEnv('MAIL_SECURE') === 'true',
      auth: {
        user: getFromEnv('MAIL_USER'),
        pass: getFromEnv('MAIL_PASSWORD')
      }
    },
    front: {
      url: getFromEnv('FRONT_URL')
    },
    jwtSecret: getFromEnv('JWT_SECRET')
  }
}
