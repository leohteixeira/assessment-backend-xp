import { makeEditProduct } from '@/main/factories/usecases'
import { makeEditProductValidation } from '@/main/factories/validations'
import { EditProductController } from '@/presentation/controllers'
import { Http } from '@/presentation/protocols'

export const makeEditProductController = (): Http.Controller => {
  const validation = makeEditProductValidation()
  const editProduct = makeEditProduct()
  return new EditProductController(validation, editProduct)
}
