import { IHashComparer } from '@/domain/interfaces/criptography/hash-comparer-interface'
import bcrypt from 'bcrypt'

export class BCryptAdapter implements IHashComparer {
  constructor(private readonly salt = 12) {}

  async hash(plainText: string): Promise<string> {
    return bcrypt.hash(plainText, this.salt)
  }

  async compare(plainText: string, digest: string): Promise<boolean> {
    return bcrypt.compare(plainText, digest)
  }
}
