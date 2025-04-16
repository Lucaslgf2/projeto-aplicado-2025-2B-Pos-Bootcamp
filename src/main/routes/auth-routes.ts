import { expressRouteAdapter } from '@/main/adapters/express/express-route-adapter'
import { makePostLoginController } from '@/main/factories/controllers/auth/login/post-login-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/auth/login', expressRouteAdapter(makePostLoginController()))
}
