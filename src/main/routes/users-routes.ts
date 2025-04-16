import { expressRouteAdapter } from '@/main/adapters/express/express-route-adapter'
import { makeDeleteUserController } from '@/main/factories/controllers/user/delete-user-controller-factory'
import { makeGetUserController } from '@/main/factories/controllers/user/get-user-controller-factory'
import { makePostUserController } from '@/main/factories/controllers/user/post-user-controller-factory'
import { makedPutUserController } from '@/main/factories/controllers/user/put-user-controller-factory'
import { authMiddleware } from '@/main/factories/middlewares/auth-middleware-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/users', expressRouteAdapter(makePostUserController()))
  router.put('/users', authMiddleware, expressRouteAdapter(makedPutUserController()))
  router.get('/users', authMiddleware, expressRouteAdapter(makeGetUserController()))
  router.delete('/users/:userId', authMiddleware, expressRouteAdapter(makeDeleteUserController()))
}
