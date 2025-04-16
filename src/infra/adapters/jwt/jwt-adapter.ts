import { JsonWebTokenError, TokenExpiredError } from '@/domain/entities/errors/token-error'
import { IAuthToken } from '@/domain/interfaces/criptography/auth-token-interface'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements IAuthToken {
  constructor(private readonly secret: string | Buffer) {}

  async signToken(payloadData: string | Buffer | object, expiresIn: number): Promise<string> {
    return jwt.sign(payloadData, this.secret, { expiresIn })
  }

  async verifyToken(token: string): Promise<Record<string, any>> {
    try {
      const decoded = jwt.verify(token, this.secret)
      if (typeof decoded === 'string') {
        return { value: decoded }
      }
      return decoded as object
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        throw new TokenExpiredError()
      }
      if (error.name === 'JsonWebTokenError') {
        throw new JsonWebTokenError()
      }
      throw error
    }
  }
}
