export enum GenderEnum {
  Male = 'male',
  Female = 'female',
  NonBinary = 'non_binary',
  TransMale = 'trans_male',
  TransFemale = 'trans_female',
  PreferNotSay = 'prefer_not_say'
}

export type IUUID = `${string}-${string}-${string}-${string}-${string}`

export type PreviousPasswords = { password: string; createdAt: Date; AtualizadoEm?: Date }
