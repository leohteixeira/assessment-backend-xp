import { AddCategory, FindCategory } from '@/domain/usecases'
import { mockCategoryModel } from '@/tests/domain/mocks'

export class AddCategorySpy implements AddCategory {
  params: AddCategory.Params
  result: AddCategory.Result = mockCategoryModel()

  async add (params: AddCategory.Params): Promise<AddCategory.Result> {
    this.params = params
    return this.result
  }
}

export class FindCategorySpy implements FindCategory {
  params: FindCategory.Params
  result: FindCategory.Result = mockCategoryModel()

  async find (params: FindCategory.Params): Promise<FindCategory.Result> {
    this.params = params
    return this.result
  }
}
