/* eslint-disable valid-typeof -- Motivo: blablabla */

import { InvalidParamError } from '@/presentation/errors'
import { IValidation } from '@/presentation/interfaces'

type FieldType = 'string' | 'number' | 'object' | 'boolean' | 'uuid'

export class TypeValidation implements IValidation {
  constructor(
    private readonly fieldName: string,
    private readonly fieldType: FieldType,
    private readonly isArray = false
  ) {}

  validate(input: any): Error | undefined {
    if (!this.isArray) {
      return this.verifyType(input[this.fieldName])
    } else {
      return this.verifyArrayTypes(input)
    }
  }

  private verifyType(input: any): Error | undefined {
    if (input === null || input === '') {
      return new InvalidParamError(this.fieldName, this.fieldType)
    }

    let formattedInput = input

    if (this.fieldType === 'uuid') {
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
      if (!uuidRegex.test(input.value as string)) {
        return new InvalidParamError(this.fieldName, this.fieldType)
      }
    }

    // convertendo números para tipos numéricos
    if (this.fieldType === 'number' && !isNaN(input as number) && input !== true && input !== false) {
      formattedInput = +input
    }

    if (this.fieldType !== 'uuid' && typeof formattedInput !== this.fieldType && formattedInput) {
      return new InvalidParamError(this.fieldName, this.fieldType)
    }
  }

  private verifyArrayTypes(input: any): Error | undefined {
    input[this.fieldName] = input[this.fieldName] ? (Array.isArray(input[this.fieldName]) ? input[this.fieldName] : [input[this.fieldName]]) : undefined
    const errors = input[this.fieldName]?.map((el: any) => this.verifyType(el)).filter((el: any) => el !== undefined)
    return errors?.length ? errors[0] : undefined
  }
}
