import { InvalidUserError } from '@/domain/entities/errors/invalid-user-error'
import { IUserRepo } from '@/domain/interfaces/repositories/user-repo-interface'
import { ISetUser, NsSetUser } from '@/domain/interfaces/use-cases/user-interface'

export class SetUser implements ISetUser {
  constructor(private readonly userRepo: IUserRepo) {}

  async set(params: NsSetUser.Input): Promise<void> {
    const userModel = await this.userRepo.selectById(params.userId)
    if (!userModel) {
      throw new InvalidUserError()
    }

    const { email, firstName, lastName, cpf, gender, phoneNumber, birthDate } = params

    if (firstName ?? lastName ?? cpf ?? gender ?? phoneNumber ?? birthDate) {
      await this.userRepo.update(params.userId, { email, password: userModel.password, firstName, lastName, cpf, gender, phoneNumber, birthDate })
    }
  }
}
