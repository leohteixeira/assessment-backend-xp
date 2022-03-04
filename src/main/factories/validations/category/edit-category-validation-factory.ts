import { EditCategoryController } from '@/presentation/controllers'
import { CompositeValidation, ObjectKeyValidation, RequiredValidation } from '@/validation/validations'
import { RequiredValidator, TypeValidator, UuidValidator } from '@/validation/validators'

export const makeEditCategoryValidation = (): CompositeValidation<EditCategoryController.Request> => {
  const requiredValidator = new RequiredValidator()
  const stringValidator = new TypeValidator('string')
  const uuidValidator = new UuidValidator()

  return new CompositeValidation([
    new RequiredValidation(requiredValidator, [
      'categoryId'
    ]),
    new ObjectKeyValidation(stringValidator, 'categoryId'),
    new ObjectKeyValidation(uuidValidator, 'categoryId'),
    new ObjectKeyValidation(stringValidator, 'name'),
    new ObjectKeyValidation(stringValidator, 'code')
  ])
}
