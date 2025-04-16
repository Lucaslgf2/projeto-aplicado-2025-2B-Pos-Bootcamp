import { IValidation } from '@/presentation/interfaces'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { TypeValidation } from '@/validation/validators/type-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makePostLoginValidation = (): IValidation => {
  const validations: IValidation[] = []

  validations.push(new RequiredFieldValidation('email'))
  validations.push(new RequiredFieldValidation('password'))

  validations.push(new TypeValidation('email', 'string'))
  validations.push(new TypeValidation('password', 'string'))

  return new ValidationComposite(validations)
}
