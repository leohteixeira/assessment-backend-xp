import {
  AddCategoryRepository,
  FindCategoriesRepository,
  FindCategoryRepository,
  EditCategoryRepository,
  RemoveCategoryRepository
} from '@/data/protocols'
import { mockCategoryModel, mockCategoryModels } from '@/tests/domain/mocks'

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  params: AddCategoryRepository.Params
  result: AddCategoryRepository.Result = mockCategoryModel()

  async add(
    params: AddCategoryRepository.Params
  ): Promise<AddCategoryRepository.Result> {
    this.params = params
    return this.result
  }
}

export class FindCategoriesRepositorySpy implements FindCategoriesRepository {
  params: FindCategoriesRepository.Params
  result: FindCategoriesRepository.Result = {
    elements: mockCategoryModels(),
    totalElements: 2,
    totalPages: 1,
    currentPage: 1
  }

  async findCategories(
    params: FindCategoriesRepository.Params
  ): Promise<FindCategoriesRepository.Result> {
    this.params = params
    return this.result
  }
}

export class FindCategoryRepositorySpy implements FindCategoryRepository {
  params: FindCategoryRepository.Params
  result: FindCategoryRepository.Result = mockCategoryModel()

  async findCategory(
    params: FindCategoryRepository.Params
  ): Promise<FindCategoryRepository.Result> {
    this.params = params
    return this.result
  }
}

export class EditCategoryRepositorySpy implements EditCategoryRepository {
  params: EditCategoryRepository.Params
  result: EditCategoryRepository.Result = mockCategoryModel()

  async editCategory(
    params: EditCategoryRepository.Params
  ): Promise<EditCategoryRepository.Result> {
    this.params = params
    return this.result
  }
}

export class RemoveCategoryRepositorySpy implements RemoveCategoryRepository {
  params: RemoveCategoryRepository.Params

  async removeCategory(
    params: RemoveCategoryRepository.Params
  ): Promise<RemoveCategoryRepository.Result> {
    this.params = params
  }
}
