import swaggerDocument from '@/main/swagger'
import { Express } from 'express'
import { serve, setup } from 'swagger-ui-express'
import { noCache } from './no-cache'

export default (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(swaggerDocument))
}
