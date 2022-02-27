import { makeAddProduct } from '@/main/factories/usecases'
import { makeAddProductValidation } from '@/main/factories/validations'
import { AddProductController } from '@/presentation/controllers'
import { Http } from '@/presentation/protocols'

export const makeAddProductController = (): Http.Controller => {
  const validation = makeAddProductValidation()
  const addProduct = makeAddProduct()
  return new AddProductController(validation, addProduct)
}
