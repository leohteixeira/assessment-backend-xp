import { AddCategory, EditCategory, FindCategories, FindCategory, RemoveCategory } from '@/domain/usecases'
import { mockCategoryModel, mockCategoryModels } from '@/tests/domain/mocks'

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

export class FindCategoriesSpy implements FindCategories {
  params: FindCategories.Params
  result: FindCategories.Result = {
    elements: mockCategoryModels(),
    totalElements: 2,
    totalPages: 1,
    currentPage: 1
  }

  async find (params: FindCategories.Params): Promise<FindCategories.Result> {
    this.params = params
    return this.result
  }
}

export class EditCategorySpy implements EditCategory {
  params: EditCategory.Params
  result: EditCategory.Result = mockCategoryModel()

  async edit (params: EditCategory.Params): Promise<EditCategory.Result> {
    this.params = params
    return this.result
  }
}

export class RemoveCategorySpy implements RemoveCategory {
  params: RemoveCategory.Params

  async remove (params: RemoveCategory.Params): Promise<RemoveCategory.Result> {
    this.params = params
  }
}
