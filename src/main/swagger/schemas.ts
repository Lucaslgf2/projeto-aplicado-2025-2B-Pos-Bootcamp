import { authSchemas, genericSchemas, topicSchemas, userSchemas } from './schemas/index'
import { paymentSchemas } from './schemas/payment'
import { SocialNetworkSchemas } from '@/main/swagger/schemas/social-network'

export default {
  ...authSchemas,
  ...genericSchemas,
  ...topicSchemas,
  ...userSchemas,
  ...paymentSchemas,
  ...SocialNetworkSchemas
}
