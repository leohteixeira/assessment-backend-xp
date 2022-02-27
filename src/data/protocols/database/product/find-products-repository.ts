import { FindProducts } from '@/domain/usecases'

export interface FindProductsRepository {
  findProducts: (params: FindProductsRepository.Params) => Promise<FindProductsRepository.Result>
}

export namespace FindProductsRepository {
  export type Params = FindProducts.Params
  export type Result = FindProducts.Result
}
