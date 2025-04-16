import { InvalidEmailError } from '@/domain/entities/errors/invalid-email-error'
import { IValidation } from '@/presentation/interfaces'

export class EmailFormatValidation implements IValidation {
  constructor(private readonly fieldName: string) {}

  validate(input: any): Error | undefined {
    if (!this.isValid(input[this.fieldName] as string)) {
      return new InvalidEmailError()
    }
  }

  private isValid(email: string): boolean {
    const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regExp.test(email)
  }
}
