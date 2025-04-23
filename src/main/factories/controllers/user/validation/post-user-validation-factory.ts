import { IValidation } from '@/presentation/interfaces'
import { GenericValuesValidation } from '@/validation/validators/generic-values-validation'
import { ISODateValidation } from '@/validation/validators/iso-date-validation'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { TypeValidation } from '@/validation/validators/type-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makePostUserValidation = (): IValidation => {
  const validations: IValidation[] = []

  validations.push(new RequiredFieldValidation('email'))
  validations.push(new RequiredFieldValidation('password'))
  validations.push(new RequiredFieldValidation('firstName'))
  validations.push(new RequiredFieldValidation('lastName'))
  validations.push(new RequiredFieldValidation('cpf'))
  validations.push(new RequiredFieldValidation('gender'))
  validations.push(new RequiredFieldValidation('phoneNumber'))
  validations.push(new RequiredFieldValidation('birthDate'))

  validations.push(new TypeValidation('email', 'string'))
  validations.push(new TypeValidation('password', 'string'))
  validations.push(new TypeValidation('firstName', 'string'))
  validations.push(new TypeValidation('lastName', 'string'))
  validations.push(new TypeValidation('cpf', 'string')) // TODO: Add CPF validation
  validations.push(new GenericValuesValidation('gender', ['male', 'female', 'non_binary', 'trans_male', 'trans_female', 'prefer_not_say']))
  validations.push(new TypeValidation('phoneNumber', 'string')) // TODO: Add phone number validation
  validations.push(new ISODateValidation('birthDate'))

  return new ValidationComposite(validations)
}
