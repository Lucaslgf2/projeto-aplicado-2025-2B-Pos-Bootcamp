export namespace NsLoginAuthentication {
  export type Input = { email: string; password: string }
  export type Output = { userId: string; token: string }
}

export interface ILoginAuthentication {
  authUser: (params: NsLoginAuthentication.Input) => Promise<NsLoginAuthentication.Output>
}
