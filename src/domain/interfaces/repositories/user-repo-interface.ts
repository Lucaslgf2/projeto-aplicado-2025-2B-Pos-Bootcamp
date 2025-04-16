import { User } from '@/domain/entities/user'

export interface IUserRepo {
  selectAll: () => Promise<User[] | undefined>
  selectById: (userId: string) => Promise<User | undefined>
  selectByEmail: (email: string) => Promise<User | undefined>
  insert: (user: Pick<User, 'email'>) => Promise<User>
  update: (userId: string, user: Pick<User, 'email'>) => Promise<void>
  softDelete: (userId: string) => Promise<void>
}
