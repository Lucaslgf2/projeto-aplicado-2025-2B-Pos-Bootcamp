import { IEmailModel } from '@/domain/entities/email'

jest.mock('@/infra/adapters/nodemailer/nodemailer-adapter', () => {
  return {
    NodeMailerAdapter: jest.fn().mockImplementation(() => {
      return {
        async sendEmail({ to, cc, subject, emailTemplate, attachments }: IEmailModel): Promise<boolean> {
          return true
        }
      }
    })
  }
})
