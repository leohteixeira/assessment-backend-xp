import { FindProduct } from '@/domain/usecases'

export interface FindProductRepository {
  findProduct: (params: FindProductRepository.Params) => Promise<FindProductRepository.Result>
}

export namespace FindProductRepository {
  export type Params = FindProduct.Params
  export type Result = FindProduct.Result
}
