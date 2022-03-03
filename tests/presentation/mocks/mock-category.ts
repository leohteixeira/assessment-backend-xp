import { AddCategory } from '@/domain/usecases'
import { mockCategoryModel } from '@/tests/domain/mocks'

export class AddCategorySpy implements AddCategory {
  params: AddCategory.Params
  result: AddCategory.Result = mockCategoryModel()

  async add (params: AddCategory.Params): Promise<AddCategory.Result> {
    this.params = params
    return this.result
  }
}
