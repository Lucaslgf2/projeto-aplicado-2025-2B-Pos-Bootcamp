/* eslint-disable no-console -- Motivo: blablabla */
/* eslint-disable @typescript-eslint/no-empty-function -- Motivo: blablabla */

import 'reflect-metadata'
import 'tsconfig-paths/register'
import './config/module-alias'

import { setupApp } from '@/main/adapters/express/config/app'
import { makeEnvVariables } from '@/main/config/env-variables'
;(async () => {})()
  .then(async () => {
    console.log('\nHello World - Projeto Aplicado POS EAD.\n')

    const envVariables = makeEnvVariables()

    const app = await setupApp()
    app.listen(envVariables.app.port, () => {
      console.log(`Server running at ${envVariables.app.url}:${envVariables.app.port}`)
    })
  })
  .catch(console.error)
  .finally(() => {
    console.log('Server closed')
  })
