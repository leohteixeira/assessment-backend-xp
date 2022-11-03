import { RemoveProductRepository } from '@/data/protocols'
import { RemoveProduct } from '@/domain/usecases'

export class DbRemoveProduct implements RemoveProduct {
  constructor(
    private readonly removeProductRepository: RemoveProductRepository
  ) {}

  async remove(params: RemoveProduct.Params): Promise<RemoveProduct.Result> {
    await this.removeProductRepository.removeProduct(params)
  }
}
