import { User } from '@/domain/entities/user'
import { IUserRepo } from '@/domain/interfaces/repositories/user-repo-interface'
import { UsuariosORM } from '@/infra/adapters/knex/entities/usuarios-orm'
import { PostgresKnexConnector } from '@/infra/adapters/knex/postgres-knex-connector'

export class UserRepository extends PostgresKnexConnector<UsuariosORM> implements IUserRepo {
  constructor() {
    super('Usuarios')
  }

  private mapToDomain(orm: UsuariosORM): User {
    return new User(orm.CodigoUsuario, orm.Email, orm.Senha, orm.Nome, orm.Sobrenome, orm.CPF, orm.Gênero, orm.Celular, orm.DataNascimento)
  }

  private mapToOrm(domain: Partial<User>): UsuariosORM {
    return new UsuariosORM({
      CodigoUsuario: domain.userId,
      Email: domain.email,
      Senha: domain.password,
      Nome: domain.firstName,
      Sobrenome: domain.lastName,
      CPF: domain.cpf,
      Gênero: domain.gender,
      Celular: domain.phoneNumber,
      DataNascimento: domain.birthDate
    })
  }

  async selectAll(): Promise<User[] | undefined> {
    const resultDb = await this.query().select('*')
    return resultDb?.map((item) => {
      return this.mapToDomain(item)
    })
  }

  async selectById(userId: string): Promise<User | undefined> {
    const [resultDb] = await this.query().select('*').where('CodigoUsuario', userId)
    return resultDb ? this.mapToDomain(resultDb) : undefined
  }

  async selectByEmail(email: string): Promise<User | undefined> {
    const [resultDb] = await this.query().select('*').where('Email', email)
    return resultDb ? this.mapToDomain(resultDb) : undefined
  }

  async insert(user: Omit<User, 'userId'>): Promise<User> {
    const newUserORM = this.mapToOrm(user)
    const [resultDb] = await this.query().insert(newUserORM).returning('*')
    return this.mapToDomain(resultDb)
  }

  async update(userId: string, user: Omit<User, 'userId'>): Promise<void> {
    await this.query()
      .update('Email', user.email)
      .update('Senha', user.password)
      .update('Nome', user.firstName)
      .update('Sobrenome', user.lastName)
      .update('CPF', user.cpf)
      .update('Gênero', user.gender)
      .update('Celular', user.phoneNumber)
      .update('DataNascimento', user.birthDate)
      .where('CodigoUsuario', userId)
  }
}
