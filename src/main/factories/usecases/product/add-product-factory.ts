import { DbAddProduct } from '@/data/usecases'
import { AddProduct } from '@/domain/usecases'
import { makePgProductRepository } from '@/main/factories/infras'

export const makeAddProduct = (): AddProduct => {
  const productRepository = makePgProductRepository()
  return new DbAddProduct(productRepository)
}
