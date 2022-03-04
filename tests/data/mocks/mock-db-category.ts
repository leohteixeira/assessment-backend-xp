import { AddCategoryRepository, FindCategoryRepository } from '@/data/protocols'
import { mockCategoryModel } from '@/tests/domain/mocks'

export class AddCategoryRepositorySpy implements AddCategoryRepository {
  params: AddCategoryRepository.Params
  result: AddCategoryRepository.Result = mockCategoryModel()

  async add (params: AddCategoryRepository.Params): Promise<AddCategoryRepository.Result> {
    this.params = params
    return this.result
  }
}

export class FindCategoryRepositorySpy implements FindCategoryRepository {
  params: FindCategoryRepository.Params
  result: FindCategoryRepository.Result = mockCategoryModel()

  async findCategory (params: FindCategoryRepository.Params): Promise<FindCategoryRepository.Result> {
    this.params = params
    return this.result
  }
}
