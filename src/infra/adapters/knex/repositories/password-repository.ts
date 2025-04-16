import { PreviousPasswords } from '@/domain/entities/types-and-enums'
import { IPasswordRepo } from '@/domain/interfaces/repositories/password-repo-interface'
import { PasswordORM } from '@/infra/adapters/knex/entities/password-orm'
import { PostgresKnexConnector } from '@/infra/adapters/knex/postgres-knex-connector'

export class PasswordRepository extends PostgresKnexConnector<PasswordORM> implements IPasswordRepo {
  constructor() {
    super('Passwords')
  }

  async selectActive(userId: string): Promise<string | undefined> {
    const [resultDb] = await this.query().select('*').where('UserId', userId).andWhere('Active', true).orderBy('CreatedAt', 'desc')
    return resultDb ? resultDb.Password : undefined
  }

  async selectInactive(userId: string): Promise<PreviousPasswords[] | undefined> {
    const resultDb = await this.query().select('*').where('UserId', userId).andWhere('Active', false).orderBy('CreatedAt', 'desc')
    return resultDb?.map((item) => {
      return { password: item.Password, createdAt: new Date(item.CreatedAt), updatedAt: item.UpdatedAt ? new Date(item.UpdatedAt) : undefined }
    })
  }

  async selectByPassword(password: string): Promise<Array<PreviousPasswords & { active: boolean }> | undefined> {
    const resultDb = await this.query().select('*').where('Password', password).orderBy('CreatedAt', 'desc')
    return resultDb?.map((item) => {
      return { password: item.Password, createdAt: new Date(item.CreatedAt), updatedAt: item.UpdatedAt ? new Date(item.UpdatedAt) : undefined, active: item.Active }
    })
  }

  async insert(userId: string, password: string): Promise<void> {
    const trx = await this.db.transaction()
    try {
      await this.query().update({ Active: false }).where('UserId', userId)
      const newPasswordORM = new PasswordORM({ UserId: userId, Password: password })
      await this.query().insert(newPasswordORM).returning('*')
      await trx.commit()
    } catch (error) {
      await trx.rollback()
      throw new Error((error as Error).message)
    }
  }
}
