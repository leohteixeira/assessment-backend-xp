import { Product } from '@/domain/models'

export interface AddProduct {
  add: (params: AddProduct.Params) => Promise<AddProduct.Result>
}

export namespace AddProduct {
  export type Params = {
    name: string
    sku: string
    price: number
    description: string
    quantity: number
    categoryId?: string
  }
  export type Result = Product.Model
}
