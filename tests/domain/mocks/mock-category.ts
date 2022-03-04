import { Category } from '@/domain/models'
import { AddCategory, FindCategory } from '@/domain/usecases'

import { datatype, date, random } from 'faker'

export const mockCategoryModel = (): Category.Model => ({
  id: datatype.uuid(),
  code: random.words(),
  name: random.words(),
  createdAt: date.soon(),
  updatedAt: date.soon()
})

export const mockAddCategoryParams = (): AddCategory.Params => ({
  code: random.words(),
  name: random.words()
})

export const mockFindCategoryParams = (): FindCategory.Params => ({
  categoryId: datatype.uuid()
})
