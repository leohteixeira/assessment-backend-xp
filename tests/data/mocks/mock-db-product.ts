import { AddProductRepository, FindProductsRepository, FindProductRepository, EditProductRepository, RemoveProductRepository } from '@/data/protocols'
import { mockProductModel, mockProductModels } from '@/tests/domain/mocks'

export class AddProductRepositorySpy implements AddProductRepository {
  params: AddProductRepository.Params
  result: AddProductRepository.Result = mockProductModel()

  async add (params: AddProductRepository.Params): Promise<AddProductRepository.Result> {
    this.params = params
    return this.result
  }
}

export class FindProductsRepositorySpy implements FindProductsRepository {
  params: FindProductsRepository.Params
  result: FindProductsRepository.Result = {
    elements: mockProductModels(),
    totalElements: 2,
    totalPages: 1,
    currentPage: 1
  }

  async findProducts (params: FindProductsRepository.Params): Promise<FindProductsRepository.Result> {
    this.params = params
    return this.result
  }
}

export class FindProductRepositorySpy implements FindProductRepository {
  params: FindProductRepository.Params
  result: FindProductRepository.Result = mockProductModel()

  async findProduct (params: FindProductRepository.Params): Promise<FindProductRepository.Result> {
    this.params = params
    return this.result
  }
}

export class EditProductRepositorySpy implements EditProductRepository {
  params: EditProductRepository.Params
  result: EditProductRepository.Result = mockProductModel()

  async editProduct (params: EditProductRepository.Params): Promise<EditProductRepository.Result> {
    this.params = params
    return this.result
  }
}

export class RemoveProductRepositorySpy implements RemoveProductRepository {
  params: RemoveProductRepository.Params

  async removeProduct (params: RemoveProductRepository.Params): Promise<RemoveProductRepository.Result> {
    this.params = params
  }
}
