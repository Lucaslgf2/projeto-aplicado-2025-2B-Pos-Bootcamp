import { InvalidParamError } from '@/presentation/errors'
import { IValidation } from '@/presentation/interfaces'

export class GenericValuesValidation implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly values: string[]
  ) {}

  validate(input: any): Error | undefined {
    if (input[this.fieldName] && !this.values.includes(input[this.fieldName] as string)) {
      return new InvalidParamError(this.fieldName, this.values.join())
    }
  }
}
