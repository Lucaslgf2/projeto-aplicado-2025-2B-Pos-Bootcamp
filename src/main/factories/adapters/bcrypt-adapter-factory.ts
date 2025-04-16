import { IHashComparer } from '@/domain/interfaces/criptography/hash-comparer-interface'
import { BCryptAdapter } from '@/infra/adapters/bcrypt/bcrypt-adapter'

export const makeBCryptAdapter = (): IHashComparer => {
  return new BCryptAdapter()
}
