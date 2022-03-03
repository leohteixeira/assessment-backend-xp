import { Product } from '@/domain/models'

export interface EditProduct {
  edit: (params: EditProduct.Params) => Promise<EditProduct.Result>
}

export namespace EditProduct {
  export type Params = {
    productId: string
    name?: string
    sku?: string
    price?: number
    description?: string
    quantity?: number
    categories?: string[]
  }
  export type Result = Product.Model
}
