import { PreviousPasswords } from '@/domain/entities/types-and-enums'

export interface IPasswordRepo {
  selectActive: (userId: string) => Promise<string | undefined>
  selectInactive: (userId: string) => Promise<PreviousPasswords[] | undefined>
  selectByPassword: (password: string) => Promise<Array<PreviousPasswords & { active: boolean }> | undefined>
  insert: (userId: string, password: string) => Promise<void>
}
