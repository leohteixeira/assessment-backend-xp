import { EditProductController } from '@/presentation/controllers'
import { CompositeValidation, ObjectKeyValidation, RequiredValidation } from '@/validation/validations'
import { ArrayValidator, NumberValidator, RequiredValidator, TypeValidator, UuidValidator } from '@/validation/validators'

export const makeEditProductValidation = (): CompositeValidation<EditProductController.Request> => {
  const requiredValidator = new RequiredValidator()
  const stringValidator = new TypeValidator('string')
  const numberValidator = new NumberValidator({ minValue: 1 })
  const uuidValidator = new UuidValidator()
  const uuidArrayValidator = new ArrayValidator({
    minLength: 0,
    itemsValidator: uuidValidator
  })

  return new CompositeValidation([
    new RequiredValidation(requiredValidator, [
      'productId'
    ]),
    new ObjectKeyValidation(stringValidator, 'name'),
    new ObjectKeyValidation(stringValidator, 'sku'),
    new ObjectKeyValidation(stringValidator, 'description'),
    new ObjectKeyValidation(numberValidator, 'price'),
    new ObjectKeyValidation(numberValidator, 'quantity'),
    new ObjectKeyValidation(uuidArrayValidator, 'categories')
  ])
}
