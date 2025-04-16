import { User } from '@/domain/entities/user'
import { UUID } from '@/domain/entities/uuid'
import { IUserRepo } from '@/domain/interfaces/repositories/user-repo-interface'
import { PasswordORM } from '@/infra/adapters/knex/entities/password-orm'
import { UserORM } from '@/infra/adapters/knex/entities/user-orm'
import { PostgresKnexConnector } from '@/infra/adapters/knex/postgres-knex-connector'

type LeftJoinPasswords = UserORM & Partial<PasswordORM>

export class UserRepository extends PostgresKnexConnector<UserORM> implements IUserRepo {
  constructor() {
    super('Users')
  }

  async selectAll(): Promise<User[] | undefined> {
    const resultDb = await this.query().select('*').where('IsDeleted', false)
    return resultDb?.map((item) => {
      return new User(new UUID(item.UserId), item.Email, item.UserType, undefined, undefined)
    })
  }

  async selectById(userId: string): Promise<User | undefined> {
    const [resultDb]: LeftJoinPasswords[] = await this.query()
      .select('Users.*', 'Password')
      .leftJoin('Passwords', (join) => {
        join.on('Users.UserId', '=', 'Passwords.UserId').andOnVal('Passwords.Active', '=', true)
      })
      .where('Users.UserId', userId)
      .andWhere('Users.IsDeleted', false)
    return resultDb ? new User(new UUID(resultDb.UserId), resultDb.Email, resultDb.UserType, resultDb.Password, undefined) : undefined
  }

  async selectByEmail(email: string): Promise<User | undefined> {
    const [resultDb]: LeftJoinPasswords[] = await this.query()
      .select('Users.*', 'Passwords.Password')
      .leftJoin('Passwords', (join) => {
        join.on('Users.UserId', '=', 'Passwords.UserId').andOnVal('Passwords.Active', '=', true)
      })
      .where({ Email: email, IsDeleted: false })
    return resultDb ? new User(new UUID(resultDb.UserId), resultDb.Email, resultDb.UserType, resultDb.Password, undefined) : undefined
  }

  async insert(user: Pick<User, 'email' | 'userType'>): Promise<User> {
    const newUserORM = new UserORM({ Email: user.email, UserType: user.userType })
    const [resultDb] = await this.query().insert(newUserORM).returning('*')
    return new User(new UUID(resultDb.UserId), resultDb.Email, resultDb.UserType, undefined, undefined)
  }

  async update(userId: string, user: Pick<User, 'email'>): Promise<void> {
    await this.query().update('Email', user.email).where('UserId', userId)
  }

  async softDelete(userId: string): Promise<void> {
    await this.query().update({ IsDeleted: true, DeletedAt: new Date() }).where('UserId', userId)
  }
}
