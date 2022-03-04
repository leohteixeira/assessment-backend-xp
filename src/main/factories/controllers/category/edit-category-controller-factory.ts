import { makeEditCategory } from '@/main/factories/usecases'
import { makeEditCategoryValidation } from '@/main/factories/validations'
import { EditCategoryController } from '@/presentation/controllers'
import { Http } from '@/presentation/protocols'

export const makeEditCategoryController = (): Http.Controller => {
  const validation = makeEditCategoryValidation()
  const editCategory = makeEditCategory()
  return new EditCategoryController(validation, editCategory)
}
