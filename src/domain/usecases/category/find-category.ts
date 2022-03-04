import { Category } from '@/domain/models'

export interface FindCategory {
  find: (params: FindCategory.Params) => Promise<FindCategory.Result>
}

export namespace FindCategory {
  export type Params = {
    categoryId: string
  }
  export type Result = Category.Model
}
