export namespace NsForgotPassword {
  export type Input = { email: string }
  export type Output = string
}

export namespace NsResetPassword {
  export type Input = { userId: string; newPassword: string; resetToken: string }
  export type Output = { userId: string }
}

export namespace NsSetPassword {
  export type Input = { userId: string; oldPassword: string; newPassword: string }
}

export namespace NsResendConfirmationEmail {
  export type Input = { email: string }
}

export namespace NSConfirmRegistration {
  export type Input = { token: string }
}

export interface IForgotPassword {
  generateResetToken: (params: NsForgotPassword.Input) => Promise<NsForgotPassword.Output>
}

export interface IResetPassword {
  execute: (params: NsResetPassword.Input) => Promise<NsResetPassword.Output>
}

export interface ISetPassword {
  set: (params: NsSetPassword.Input) => Promise<void>
}

export interface IResendConfirmationEmail {
  resend: (params: NsResendConfirmationEmail.Input) => Promise<void>
}

export interface IConfirmRegistration {
  confirm: (params: NSConfirmRegistration.Input) => Promise<void>
}
