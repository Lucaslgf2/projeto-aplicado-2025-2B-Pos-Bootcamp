import { IUserRepo } from '@/domain/interfaces/repositories/user-repo-interface'
import { IDeleteUser, NsDeleteUser } from '@/domain/interfaces/use-cases/user-interface'

export class DeleteUser implements IDeleteUser {
  constructor(private readonly userRepo: IUserRepo) {}

  async delete(params: NsDeleteUser.Input): Promise<void> {
    const user = await this.userRepo.selectById(params.userId)
    if (!user) {
      throw new Error('User not found or already deleted')
    }

    await this.userRepo.softDelete(params.userId)
  }
}
