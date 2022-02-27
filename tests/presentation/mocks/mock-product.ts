import { AddProduct } from '@/domain/usecases'
import { mockProductModel } from '@/tests/domain/mocks'

export class AddProductSpy implements AddProduct {
  params: AddProduct.Params
  result: AddProduct.Result = mockProductModel()

  async add (params: AddProduct.Params): Promise<AddProduct.Result> {
    this.params = params
    return this.result
  }
}
