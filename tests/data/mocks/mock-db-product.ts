import { AddProductRepository } from '@/data/protocols'
import { mockProductModel } from '@/tests/domain/mocks'

export class AddProductRepositorySpy implements AddProductRepository {
  params: AddProductRepository.Params
  result: AddProductRepository.Result = mockProductModel()

  async add (params: AddProductRepository.Params): Promise<AddProductRepository.Result> {
    this.params = params
    return this.result
  }
}
