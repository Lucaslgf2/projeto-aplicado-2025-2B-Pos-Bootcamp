/* eslint-disable @typescript-eslint/explicit-function-return-type -- Motivo: blablabla */

import knex from 'knex'
import { KnexSingletonConnection } from './knex-singleton-connection'

export abstract class PostgresKnexConnector<T extends object> {
  protected tableName: string
  protected db: knex.Knex

  constructor(tableName: string) {
    this.tableName = tableName
    this.db = KnexSingletonConnection.getInstance()
  }

  protected query = () => {
    return this.db<T>(this.tableName)
  }
}
