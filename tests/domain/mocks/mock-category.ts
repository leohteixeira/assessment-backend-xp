import { Category } from '@/domain/models'
import {
  AddCategory,
  FindCategory,
  FindCategories,
  EditCategory
} from '@/domain/usecases'

import { datatype, date, random } from 'faker'

export const mockCategoryModel = (): Category.Model => ({
  id: datatype.uuid(),
  code: random.words(),
  name: random.words(),
  createdAt: date.soon(),
  updatedAt: date.soon()
})

export const mockCategoryModels = (): Category.Model[] => [
  mockCategoryModel(),
  mockCategoryModel()
]

export const mockFindCategoriesParams = (): FindCategories.Params => ({
  query: {
    search: random.word(),
    searchValue: random.word(),
    limit: datatype.number({ min: 1 }),
    page: datatype.number({ min: 1 })
  }
})

export const mockAddCategoryParams = (): AddCategory.Params => ({
  code: random.words(),
  name: random.words()
})

export const mockFindCategoryParams = (): FindCategory.Params => ({
  categoryId: datatype.uuid()
})

export const mockEditCategoryParams = (): EditCategory.Params => ({
  categoryId: datatype.uuid(),
  code: random.words(),
  name: random.words()
})
