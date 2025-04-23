import { User } from '@/domain/entities/user'

export interface IUserRepo {
  selectAll: () => Promise<User[] | undefined>
  selectById: (userId: string) => Promise<User | undefined>
  selectByEmail: (email: string) => Promise<User | undefined>
  insert: (user: Omit<User, 'userId'>) => Promise<User>
  update: (userId: string, user: Omit<User, 'userId'>) => Promise<void>
}
