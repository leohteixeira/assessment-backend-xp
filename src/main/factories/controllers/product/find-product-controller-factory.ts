import { makeFindProduct } from '@/main/factories/usecases'
import { makeFindProductValidation } from '@/main/factories/validations'
import { FindProductController } from '@/presentation/controllers'
import { Http } from '@/presentation/protocols'

export const makeFindProductController = (): Http.Controller => {
  const validation = makeFindProductValidation()
  const findProduct = makeFindProduct()
  return new FindProductController(validation, findProduct)
}
