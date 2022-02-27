import { makeFindProducts } from '@/main/factories/usecases'
import { makeFindProductsValidation } from '@/main/factories/validations'
import { FindProductsController } from '@/presentation/controllers'
import { Http } from '@/presentation/protocols'

export const makeFindProductsController = (): Http.Controller => {
  const validation = makeFindProductsValidation()
  const findProducts = makeFindProducts()
  return new FindProductsController(validation, findProducts)
}
