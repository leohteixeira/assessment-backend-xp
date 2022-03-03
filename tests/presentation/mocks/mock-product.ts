import { AddProduct, EditProduct, FindProduct, FindProducts, RemoveProduct } from '@/domain/usecases'
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

export class FindProductSpy implements FindProduct {
  params: FindProduct.Params
  result: FindProduct.Result = mockProductModel()

  async find (params: FindProduct.Params): Promise<FindProduct.Result> {
    this.params = params
    return this.result
  }
}

export class EditProductSpy implements EditProduct {
  params: EditProduct.Params
  result: EditProduct.Result = mockProductModel()

  async edit (params: EditProduct.Params): Promise<EditProduct.Result> {
    this.params = params
    return this.result
  }
}

export class RemoveProductSpy implements RemoveProduct {
  params: RemoveProduct.Params

  async remove (params: RemoveProduct.Params): Promise<RemoveProduct.Result> {
    this.params = params
  }
}
