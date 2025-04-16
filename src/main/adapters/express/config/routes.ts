import { Express, Router } from 'express'

import authLoginRoutes from '@/main/routes/auth-routes'
import userRoutes from '@/main/routes/users-routes'

export const setupRoutes = (app: Express): void => {
  const router = Router()

  authLoginRoutes(router)
  userRoutes(router)

  app.use('/api', router)
}
