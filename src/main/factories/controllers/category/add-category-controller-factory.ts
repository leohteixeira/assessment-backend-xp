import { makeAddCategory } from '@/main/factories/usecases'
import { makeAddCategoryValidation } from '@/main/factories/validations'
import { AddCategoryController } from '@/presentation/controllers'
import { Http } from '@/presentation/protocols'

export const makeAddCategoryController = (): Http.Controller => {
  const validation = makeAddCategoryValidation()
  const addCategory = makeAddCategory()
  return new AddCategoryController(validation, addCategory)
}
