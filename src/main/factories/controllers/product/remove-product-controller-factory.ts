import { makeRemoveProduct } from '@/main/factories/usecases'
import { makeRemoveProductValidation } from '@/main/factories/validations'
import { RemoveProductController } from '@/presentation/controllers'
import { Http } from '@/presentation/protocols'

export const makeRemoveProductController = (): Http.Controller => {
  const validation = makeRemoveProductValidation()
  const removeProduct = makeRemoveProduct()
  return new RemoveProductController(validation, removeProduct)
}
