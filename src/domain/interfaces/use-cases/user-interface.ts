import { User } from '@/domain/entities/user'

export namespace NsSaveUser {
  export type Input = Omit<User, 'userId'>
  export type Output = { userId: string; confirmToken: string }
}

export namespace NsSetUser {
  export type Input = Omit<User, 'password'>
}

export namespace NsFindUser {
  export type Input = Pick<User, 'userId'>
  export type Output = User
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
