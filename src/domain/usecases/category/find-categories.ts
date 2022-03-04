import { DatabaseDocument, Category, RequestQuery } from '@/domain/models'

export interface FindCategories {
  find: (params: FindCategories.Params) => Promise<FindCategories.Result>
}

export namespace FindCategories {
  export type Params = {
    query: Partial<RequestQuery.Search & RequestQuery.Limit & RequestQuery.Page>
  }
  export type Result = DatabaseDocument.List<Category.Model>
}
