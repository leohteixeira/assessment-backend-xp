import { Category } from '@/domain/models'

export interface EditCategory {
  edit: (params: EditCategory.Params) => Promise<EditCategory.Result>
}

export namespace EditCategory {
  export type Params = {
    categoryId: string
    name?: string
    sku?: string
    price?: number
    description?: string
    quantity?: number
    categories?: string[]
  }
  export type Result = Category.Model
}
