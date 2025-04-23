/* eslint-disable no-console -- Motivo: blablabla */

import { exec } from 'child_process'
import util from 'util'

export default async (): Promise<void> => {
  console.log('Running jest-global-teardown..\n')

  if (!process.env.CI) {
    console.log('Stopping Docker container for PostgreSQL..')
    const execPromise = util.promisify(exec)
    await execPromise('podman-compose -f tests/docker-compose.yml down')
    console.log('Docker container stopped.')
  }
}
