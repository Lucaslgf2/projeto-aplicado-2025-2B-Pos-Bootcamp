import { GenderEnum } from './types-and-enums'

export class User {
  constructor(
    public userId: string,
    public email: string,
    public password: string | undefined,
    public firstName: string,
    public lastName: string,
    public cpf: string | undefined,
    public gender: GenderEnum,
    public phoneNumber: string,
    public birthDate: Date
  ) {}
}
