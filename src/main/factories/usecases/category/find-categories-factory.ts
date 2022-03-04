import { DbFindCategories } from '@/data/usecases'
import { FindCategories } from '@/domain/usecases'
import { makePgCategoryRepository } from '@/main/factories/infras'

export const makeFindCategories = (): FindCategories => {
  const categoryRepository = makePgCategoryRepository()
  return new DbFindCategories(categoryRepository)
}
