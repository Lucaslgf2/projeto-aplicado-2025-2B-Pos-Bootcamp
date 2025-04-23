import { InvalidCredentialsError } from '@/domain/entities/errors/invalid-credentials-error'
import { IAuthToken } from '@/domain/interfaces/criptography/auth-token-interface'
import { IHashComparer } from '@/domain/interfaces/criptography/hash-comparer-interface'
import { IUserRepo } from '@/domain/interfaces/repositories/user-repo-interface'
import { ILoginAuthentication, NsLoginAuthentication } from '@/domain/interfaces/use-cases/login-interface'

export class LoginAuthentication implements ILoginAuthentication {
  constructor(
    private readonly userRepo: IUserRepo,
    private readonly hashComparer: IHashComparer,
    private readonly authToken: IAuthToken
  ) {}

  async authUser(params: NsLoginAuthentication.Input): Promise<NsLoginAuthentication.Output> {
    const userModel = await this.userRepo.selectByEmail(params.email)
    if (!userModel) {
      throw new InvalidCredentialsError()
    }

    const isValidPassword = await this.hashComparer.compare(params.password, userModel.password ?? '')
    if (!isValidPassword) {
      throw new InvalidCredentialsError()
    }

    const acessToken = await this.authToken.signToken({ ...userModel, password: undefined }, 8 * 60 * 60)
    return { userId: userModel.userId, token: acessToken }
  }
}
