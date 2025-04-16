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

    if (params.email && params.email !== userModel.email) {
      await this.userRepo.update(params.userId, { email: params.email })
    }
  }
}
