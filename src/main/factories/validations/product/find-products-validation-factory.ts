import { FindProductsController } from '@/presentation/controllers'
import {
  CompositeValidation,
  ObjectKeyValidation
} from '@/validation/validations'
import { NumberValidator, TypeValidator } from '@/validation/validators'

export const makeFindProductsValidation =
  (): CompositeValidation<FindProductsController.Request> => {
    const stringValidator = new TypeValidator('string')
    const numberValidator = new NumberValidator({ minValue: 1 })

    return new CompositeValidation([
      new ObjectKeyValidation(stringValidator, 'search'),
      new ObjectKeyValidation(numberValidator, 'limit'),
      new ObjectKeyValidation(numberValidator, 'page')
    ])
  }
