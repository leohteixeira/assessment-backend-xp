import { makeRemoveCategory } from '@/main/factories/usecases'
import { makeRemoveCategoryValidation } from '@/main/factories/validations'
import { RemoveCategoryController } from '@/presentation/controllers'
import { Http } from '@/presentation/protocols'

export const makeRemoveCategoryController = (): Http.Controller => {
  const validation = makeRemoveCategoryValidation()
  const removeCategory = makeRemoveCategory()
  return new RemoveCategoryController(validation, removeCategory)
}
