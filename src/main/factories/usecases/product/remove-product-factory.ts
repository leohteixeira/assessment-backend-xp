import { DbRemoveProduct } from '@/data/usecases'
import { RemoveProduct } from '@/domain/usecases'
import { makePgProductRepository } from '@/main/factories/infras'

export const makeRemoveProduct = (): RemoveProduct => {
  const productRepository = makePgProductRepository()
  return new DbRemoveProduct(productRepository)
}
