import { makeEnvVariables } from '@/main/config/env-variables'
import { type Knex } from 'knex'

export function getKnexConfig(): Record<string, Knex.Config> {
  const envVariables = makeEnvVariables()
  const isNodeEnvTest = envVariables.node.env === 'test'

  return {
    postgresDb: {
      client: 'pg',
      connection: {
        application_name: envVariables.app.name,
        host: envVariables.db.host,
        port: envVariables.db.port,
        database: envVariables.db.name,
        user: envVariables.db.user,
        password: envVariables.db.password
      },
      debug: false,
      migrations: {
        tableName: 'migrations_knex',
        directory: isNodeEnvTest ? './src/infra/adapters/knex/setup/migrations' : './setup/migrations',
        extension: 'ts'
      },
      seeds: {
        directory: isNodeEnvTest ? './src/infra/adapters/knex/setup/seeds' : './setup/seeds',
        extension: 'ts'
      }
    }
  }
}

export default getKnexConfig()
