import { DbRemoveCategory } from '@/data/usecases'
import { RemoveCategory } from '@/domain/usecases'
import { makePgCategoryRepository } from '@/main/factories/infras'

export const makeRemoveCategory = (): RemoveCategory => {
  const categoryRepository = makePgCategoryRepository()
  return new DbRemoveCategory(categoryRepository)
}
