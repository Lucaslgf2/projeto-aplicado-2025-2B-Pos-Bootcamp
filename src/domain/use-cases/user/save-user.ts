import { InvalidEmailError } from '@/domain/entities/errors/invalid-email-error'
import { IAuthToken } from '@/domain/interfaces/criptography/auth-token-interface'
import { IHashComparer } from '@/domain/interfaces/criptography/hash-comparer-interface'
import { ISendEmail } from '@/domain/interfaces/email/send-email-interface'
import { IPasswordRepo } from '@/domain/interfaces/repositories/password-repo-interface'
import { IUserRepo } from '@/domain/interfaces/repositories/user-repo-interface'
import { ISaveUser, NsSaveUser } from '@/domain/interfaces/use-cases/user-interface'

export class SaveUser implements ISaveUser {
  constructor(
    private readonly userRepo: IUserRepo,
    private readonly hashComparer: IHashComparer,
    private readonly passwordRepo: IPasswordRepo,
    private readonly authToken: IAuthToken,
    private readonly frontUrl: string,
    private readonly sendEmail: ISendEmail
  ) {}

  async save(params: NsSaveUser.Input): Promise<NsSaveUser.Output> {
    const emailExists = await this.userRepo.selectByEmail(params.email)
    if (emailExists) {
      throw new InvalidEmailError()
    }

    const newUser = await this.userRepo.insert(params)

    if (params.password) {
      const passwordHash = await this.hashComparer.hash(params.password)
      await this.passwordRepo.insert(newUser.userId.value, passwordHash)
    }

    const confirmToken = await this.authToken.signToken({ userId: newUser.userId.value, email: newUser.email }, 1)
    const confirmLink = `${this.frontUrl}/auth/email-confirmation?token=${confirmToken}`
    const name = 'FirstName LastName}'
    const address = params.email
    const subject = 'Gestão Condominio | Confirmação de Cadastro'
    await this.sendEmail.sendEmail({ to: [{ name, address }], subject, emailTemplate: { templateName: 'confirmRegistrationEmail', variables: { userName: name, confirmLink } } })

    return { userId: newUser.userId.value, confirmToken }
  }
}
