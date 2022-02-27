import { AddProduct, FindProducts } from '@/domain/usecases'
import { mockProductModel, mockProductModels } from '@/tests/domain/mocks'

export class AddProductSpy implements AddProduct {
  params: AddProduct.Params
  result: AddProduct.Result = mockProductModel()

  async add (params: AddProduct.Params): Promise<AddProduct.Result> {
    this.params = params
    return this.result
  }
}

export class FindProductsSpy implements FindProducts {
  params: FindProducts.Params
  result: FindProducts.Result = {
    elements: mockProductModels(),
    totalElements: 2,
    totalPages: 1,
    currentPage: 1
  }

  async find (params: FindProducts.Params): Promise<FindProducts.Result> {
    this.params = params
    return this.result
  }
}
