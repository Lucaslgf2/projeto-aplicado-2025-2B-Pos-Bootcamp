import { IValidation } from '@/presentation/interfaces'
import { GenericValuesValidation } from '@/validation/validators/generic-values-validation'
import { ISODateValidation } from '@/validation/validators/iso-date-validation'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { TypeValidation } from '@/validation/validators/type-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

export const makePutUserValidation = (): IValidation => {
  const validations: IValidation[] = []

  validations.push(new RequiredFieldValidation('userId'))

  validations.push(new TypeValidation('userId', 'uuid'))
  validations.push(new TypeValidation('email', 'string'))
  validations.push(new TypeValidation('firstName', 'string'))
  validations.push(new TypeValidation('lastName', 'string'))
  validations.push(new TypeValidation('cpf', 'string')) // TODO: Add CPF validation
  validations.push(new GenericValuesValidation('gender', ['male', 'female', 'non_binary', 'trans_male', 'trans_female', 'prefer_not_say']))
  validations.push(new TypeValidation('phoneNumber', 'string')) // TODO: Add phone number validation
  validations.push(new ISODateValidation('birthDate'))
  validations.push(new TypeValidation('acceptedTerms', 'boolean'))

  return new ValidationComposite(validations)
}
