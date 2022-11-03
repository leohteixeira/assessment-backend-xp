import { FindProductRepository } from '@/data/protocols'
import { FindProduct } from '@/domain/usecases'

export class DbFindProduct implements FindProduct {
  constructor(private readonly findProductRepository: FindProductRepository) {}

  async find(params: FindProduct.Params): Promise<FindProduct.Result> {
    const product = await this.findProductRepository.findProduct(params)
    return product
  }
}
