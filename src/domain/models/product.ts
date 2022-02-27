import { Category } from '@/domain/models'

export namespace Product {
  export interface Model {
    id: string
    name: string
    sku: string
    price: number
    description?: string
    quantity: number
    categories?: Category.Model[]
    createdAt: Date
    updatedAt: Date
  }
}
