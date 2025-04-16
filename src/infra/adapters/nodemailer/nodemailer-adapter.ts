import { IEmailModel, TemplateNames } from '@/domain/entities/email'
import { ISendEmail } from '@/domain/interfaces/email/send-email-interface'
import loggerWinston from '@/main/adapters/winston/logger-winston'
import { createTransport, Transporter } from 'nodemailer'
import templates from './templates/index'

export class NodeMailerAdapter implements ISendEmail {
  private readonly transport: Transporter

  constructor(
    private readonly mailHost: string,
    private readonly mailPort: number,
    private readonly useTLS: boolean,
    private readonly mailAuthUser: string,
    private readonly mailAuthPassword: string,
    private readonly fromAddress: string
  ) {
    this.transport = createTransport({
      host: this.mailHost,
      port: this.mailPort,
      secure: this.useTLS,
      auth: { user: this.mailAuthUser, pass: this.mailAuthPassword }
    })
  }

  async sendEmail({ to, cc, subject, emailTemplate, attachments }: IEmailModel): Promise<boolean> {
    try {
      const rawHtml = await this.loadTemplate(emailTemplate.templateName)
      const html = this.parseTemplate(rawHtml, emailTemplate.variables)

      await this.transport.sendMail({
        from: { name: 'LGF | Gestão Condominios', address: this.fromAddress },
        to,
        cc,
        subject,
        attachments,
        html
      })
      return true
    } catch (error) {
      loggerWinston.error('error ao enviar email', { error })
      return false
    }
  }

  private async loadTemplate(templateName: TemplateNames): Promise<string> {
    const template = templates[templateName]
    if (!template) {
      throw new Error(`Template '${templateName}' não encontrado.`)
    }
    return template
  }

  private parseTemplate(template: string, variables: Record<string, string | number> = {}): string {
    return template.replace(/{{(.*?)}}/g, (_, key) => {
      return variables[key.trim()]?.toString() ?? ''
    })
  }
}
