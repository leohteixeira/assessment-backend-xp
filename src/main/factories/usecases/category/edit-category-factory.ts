import { DbEditCategory } from '@/data/usecases'
import { EditCategory } from '@/domain/usecases'
import { makePgCategoryRepository } from '@/main/factories/infras'

export const makeEditCategory = (): EditCategory => {
  const categoryRepository = makePgCategoryRepository()
  return new DbEditCategory(categoryRepository)
}
