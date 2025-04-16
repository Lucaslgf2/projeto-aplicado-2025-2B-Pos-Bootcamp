import { authPaths, topicsPath, usersPath } from './paths/'
import { paymentsPath } from './paths/payments'
import { socialNetworkPaths } from '@/main/swagger/paths/social-network'

export default {
  ...authPaths,
  ...topicsPath,
  ...usersPath,
  ...paymentsPath,
  ...socialNetworkPaths
}
