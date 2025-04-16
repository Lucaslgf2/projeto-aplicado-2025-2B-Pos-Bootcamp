import { PreviousPasswords } from './types-and-enums'
import { UUID } from './uuid'

export class User {
  constructor(
    public userId: UUID,
    public email: string,
    public password: string | undefined,
    public previousPasswords: PreviousPasswords[] | undefined
  ) {}
}
