import { InvalidUserError } from '@/domain/entities/errors/invalid-user-error'
import { IUserRepo } from '@/domain/interfaces/repositories/user-repo-interface'
import { IFindUser, NsFindUser } from '@/domain/interfaces/use-cases/user-interface'

export class FindUser implements IFindUser {
  constructor(private readonly userRepo: IUserRepo) {}

  async find(params: NsFindUser.Input): Promise<NsFindUser.Output> {
    const userModel = await this.userRepo.selectById(params.userId)
    if (!userModel) {
      throw new InvalidUserError()
    }

    return {
      ...userModel,
      password: undefined
    }
  }
}
