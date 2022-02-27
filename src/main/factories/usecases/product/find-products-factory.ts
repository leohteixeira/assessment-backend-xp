import { DbFindProducts } from '@/data/usecases'
import { FindProducts } from '@/domain/usecases'
import { makePgProductRepository } from '@/main/factories/infras'

export const makeFindProducts = (): FindProducts => {
  const productRepository = makePgProductRepository()
  return new DbFindProducts(productRepository)
}
