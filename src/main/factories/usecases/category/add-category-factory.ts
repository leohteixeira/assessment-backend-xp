import { DbAddCategory } from '@/data/usecases'
import { AddCategory } from '@/domain/usecases'
import { makePgCategoryRepository } from '@/main/factories/infras'

export const makeAddCategory = (): AddCategory => {
  const categoryRepository = makePgCategoryRepository()
  return new DbAddCategory(categoryRepository)
}
