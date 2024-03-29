import { FindProductController } from '@/presentation/controllers'
import {
  CompositeValidation,
  ObjectKeyValidation,
  RequiredValidation
} from '@/validation/validations'
import {
  RequiredValidator,
  TypeValidator,
  UuidValidator
} from '@/validation/validators'

export const makeFindProductValidation =
  (): CompositeValidation<FindProductController.Request> => {
    const requiredValidator = new RequiredValidator()
    const stringValidator = new TypeValidator('string')
    const uuidValidator = new UuidValidator()

    return new CompositeValidation([
      new RequiredValidation(requiredValidator, ['productId']),
      new ObjectKeyValidation(stringValidator, 'productId'),
      new ObjectKeyValidation(uuidValidator, 'productId')
    ])
  }
