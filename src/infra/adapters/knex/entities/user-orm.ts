export class UserORM {
  UserId!: string
  Email!: string
  IsDeleted!: boolean
  CreatedAt!: Date
  UpdatedAt?: Date
  DeletedAt?: Date

  constructor(data: Partial<UserORM>) {
    Object.assign(this, data)
  }
}
