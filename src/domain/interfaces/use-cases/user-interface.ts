import { User } from '@/domain/entities/user'

export namespace NsSaveUser {
  export type Input = Pick<User, 'email' | 'password'>
  export type Output = { userId: string; confirmToken: string }
}

export namespace NsSetUser {
  export type Input = { userId: string; email: string }
}

export namespace NsFindUser {
  export type Input = { userId: string }
  export type Output = User
}

export namespace NsDeleteUser {
  export type Input = { userId: string }
}

export interface ISaveUser {
  save: (params: NsSaveUser.Input) => Promise<NsSaveUser.Output>
}

export interface ISetUser {
  set: (params: NsSetUser.Input) => Promise<void>
}

export interface IFindUser {
  find: (params: NsFindUser.Input) => Promise<NsFindUser.Output>
}

export interface IDeleteUser {
  delete: (params: NsDeleteUser.Input) => Promise<void>
}
