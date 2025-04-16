export class PasswordORM {
  UserId!: string
  Password!: string
  Active!: boolean
  CreatedAt!: Date
  UpdatedAt?: Date

  constructor(data: Partial<PasswordORM>) {
    Object.assign(this, data)
  }
}
