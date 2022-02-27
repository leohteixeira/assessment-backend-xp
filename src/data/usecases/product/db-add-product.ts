import { AddProductRepository } from '@/data/protocols'
import { AddProduct } from '@/domain/usecases'

export class DbAddProduct implements AddProduct {
  constructor (
    private readonly addProductRepository: AddProductRepository
  ) {}

  async add (params: AddProduct.Params): Promise<AddProduct.Result> {
    const product = await this.addProductRepository.add(params)
    return product
  }
}
