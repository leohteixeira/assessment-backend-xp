import { AddProduct } from '@/domain/usecases'

export interface AddProductRepository {
  add: (params: AddProductRepository.Params) => Promise<AddProductRepository.Result>
}

export namespace AddProductRepository {
  export type Params = AddProduct.Params
  export type Result = AddProduct.Result
}
