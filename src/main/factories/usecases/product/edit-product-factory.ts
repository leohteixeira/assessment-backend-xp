import { DbEditProduct } from '@/data/usecases'
import { EditProduct } from '@/domain/usecases'
import { makePgProductRepository } from '@/main/factories/infras'

export const makeEditProduct = (): EditProduct => {
  const productRepository = makePgProductRepository()
  return new DbEditProduct(productRepository)
}
