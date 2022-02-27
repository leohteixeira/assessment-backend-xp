import { Product } from '@/domain/models'

export namespace Category {
  export interface Model {
    id: string
    code: string
    name: string
    products?: Product.Model[]
    createdAt: Date
    updatedAt: Date
  }
}
