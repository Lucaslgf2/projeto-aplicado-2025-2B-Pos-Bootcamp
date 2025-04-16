import { IValidation } from '@/presentation/interfaces'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { TypeValidation } from '@/validation/validators/type-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makeAuthMiddlewareValidation = (): IValidation => {
  const validations: IValidation[] = []

  validations.push(new RequiredFieldValidation('authorization'))
  validations.push(new TypeValidation('authorization', 'string'))

  return new ValidationComposite(validations)
}
