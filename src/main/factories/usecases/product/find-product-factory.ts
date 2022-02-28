import { DbFindProduct } from '@/data/usecases'
import { FindProduct } from '@/domain/usecases'
import { makePgProductRepository } from '@/main/factories/infras'

export const makeFindProduct = (): FindProduct => {
  const productRepository = makePgProductRepository()
  return new DbFindProduct(productRepository)
}
