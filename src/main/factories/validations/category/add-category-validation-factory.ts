import { AddCategoryController } from '@/presentation/controllers'
import { CompositeValidation, ObjectKeyValidation, RequiredValidation } from '@/validation/validations'
import { RequiredValidator, TypeValidator } from '@/validation/validators'

export const makeAddCategoryValidation = (): CompositeValidation<AddCategoryController.Request> => {
  const requiredValidator = new RequiredValidator()
  const stringValidator = new TypeValidator('string')

  return new CompositeValidation([
    new RequiredValidation(requiredValidator, [
      'name',
      'code'
    ]),
    new ObjectKeyValidation(stringValidator, 'name'),
    new ObjectKeyValidation(stringValidator, 'code')
  ])
}
