import { DbFindCategory } from '@/data/usecases'
import { FindCategory } from '@/domain/usecases'
import { makePgCategoryRepository } from '@/main/factories/infras'

export const makeFindCategory = (): FindCategory => {
  const categoryRepository = makePgCategoryRepository()
  return new DbFindCategory(categoryRepository)
}
