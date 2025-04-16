import { IAuthToken } from '@/domain/interfaces/criptography/auth-token-interface'
import { JwtAdapter } from '@/infra/adapters/jwt/jwt-adapter'

export const makeJwtAdapter = (jwtSecret: string): IAuthToken => {
  return new JwtAdapter(jwtSecret)
}
