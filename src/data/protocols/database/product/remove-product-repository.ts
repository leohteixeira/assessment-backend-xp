import { RemoveProduct } from '@/domain/usecases'

export interface RemoveProductRepository {
  removeProduct: (params: RemoveProductRepository.Params) => Promise<RemoveProductRepository.Result>
}

export namespace RemoveProductRepository {
  export type Params = RemoveProduct.Params
  export type Result = RemoveProduct.Result
}
