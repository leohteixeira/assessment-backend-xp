import { makeFindCategory } from '@/main/factories/usecases'
import { makeFindCategoryValidation } from '@/main/factories/validations'
import { FindCategoryController } from '@/presentation/controllers'
import { Http } from '@/presentation/protocols'

export const makeFindCategoryController = (): Http.Controller => {
  const validation = makeFindCategoryValidation()
  const findCategory = makeFindCategory()
  return new FindCategoryController(validation, findCategory)
}
