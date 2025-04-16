export type TemplateNames = 'confirmRegistrationEmail' | 'changedPasswordEmail' | 'forgotPasswordEmail'

interface IEmailContactModel {
  name: string
  address: string
}

interface IAnexosEmailModel {
  filename?: string
  path?: string
  content?: string | Buffer
  encoding: 'UTF-8'
}

export interface IEmailModel {
  to: IEmailContactModel[]
  cc?: IEmailContactModel[]
  subject: string
  emailTemplate: {
    templateName: TemplateNames
    variables?: Record<string, string | number>
  }
  attachments?: IAnexosEmailModel[]
}
