import { EditProductRepository } from '@/data/protocols'
import { EditProduct } from '@/domain/usecases'

export class DbEditProduct implements EditProduct {
  constructor (
    private readonly editProductRepository: EditProductRepository
  ) {}

  async edit (params: EditProduct.Params): Promise<EditProduct.Result> {
    const product = await this.editProductRepository.editProduct(params)
    return product
  }
}
