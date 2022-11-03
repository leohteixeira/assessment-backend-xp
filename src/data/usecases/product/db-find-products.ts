import { FindProductsRepository } from '@/data/protocols'
import { FindProducts } from '@/domain/usecases'

export class DbFindProducts implements FindProducts {
  constructor(
    private readonly findProductsRepository: FindProductsRepository
  ) {}

  async find(params: FindProducts.Params): Promise<FindProducts.Result> {
    const result = await this.findProductsRepository.findProducts(params)
    return result
  }
}
