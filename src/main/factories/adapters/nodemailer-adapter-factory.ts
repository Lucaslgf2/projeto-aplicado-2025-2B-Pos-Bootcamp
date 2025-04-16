import { NodeMailerAdapter } from '@/infra/adapters/nodemailer/nodemailer-adapter'
import { makeEnvVariables } from '@/main/config/env-variables'

export const makeNodeMailerAdapter = (): NodeMailerAdapter => {
  const envVariables = makeEnvVariables()
  return new NodeMailerAdapter(envVariables.mail.host, envVariables.mail.port, envVariables.mail.secure, envVariables.mail.auth.user, envVariables.mail.auth.pass, envVariables.mail.fromAddress)
}
