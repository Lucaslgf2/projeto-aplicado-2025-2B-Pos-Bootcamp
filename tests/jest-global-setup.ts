/* eslint-disable no-console -- Motivo: blablabla */

import 'tsconfig-paths/register'

import { KnexSingletonConnection } from '@/infra/adapters/knex/knex-singleton-connection'
import { exec } from 'child_process'
import util from 'util'

export default async (): Promise<void> => {
  console.log('Running jest-global-setup..\n')

  await initDbDocker()
  await initDbSchema()
}

async function initDbDocker(): Promise<void> {
  if (!process.env.CI) {
    console.log('Starting Docker container for PostgreSQL..')
    const execPromise = util.promisify(exec)
    await execPromise('podman-compose -f tests/docker-compose.yml up -d')
    console.log('Docker container started.')
  }
}

async function initDbSchema(): Promise<void> {
  const db = KnexSingletonConnection.getInstance()
  await db.migrate.rollback({}, true)
  await db.migrate.latest()
  await db.seed.run()
}
