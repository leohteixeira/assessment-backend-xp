import { Product } from '@/domain/models'

export interface FindProduct {
  find: (params: FindProduct.Params) => Promise<FindProduct.Result>
}

export namespace FindProduct {
  export type Params = {
    productId: string
  }
  export type Result = Product.Model
}
