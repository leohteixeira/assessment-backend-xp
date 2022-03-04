import { makeFindCategories } from '@/main/factories/usecases'
import { makeFindCategoriesValidation } from '@/main/factories/validations'
import { FindCategoriesController } from '@/presentation/controllers'
import { Http } from '@/presentation/protocols'

export const makeFindCategoriesController = (): Http.Controller => {
  const validation = makeFindCategoriesValidation()
  const findCategories = makeFindCategories()
  return new FindCategoriesController(validation, findCategories)
}
