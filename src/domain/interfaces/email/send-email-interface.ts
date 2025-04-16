import { IEmailModel } from '@/domain/entities/email'

export interface ISendEmail {
  sendEmail: (emailModel: IEmailModel) => Promise<boolean>
}
