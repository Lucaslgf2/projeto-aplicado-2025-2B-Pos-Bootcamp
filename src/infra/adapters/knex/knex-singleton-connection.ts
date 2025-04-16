import knex from 'knex'
import { getKnexConfig } from './knexfile'

export class KnexSingletonConnection {
  private static instance: knex.Knex

  public static getInstance(): knex.Knex {
    if (!KnexSingletonConnection.instance) {
      const knexConfig = getKnexConfig()
      KnexSingletonConnection.instance = knex(knexConfig.postgresDb)
    }
    return KnexSingletonConnection.instance
  }
}
