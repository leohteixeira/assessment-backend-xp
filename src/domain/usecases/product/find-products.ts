import { DatabaseDocument, Product, RequestQuery } from '@/domain/models'

export interface FindProducts {
  find: (params: FindProducts.Params) => Promise<FindProducts.Result>
}

export namespace FindProducts {
  export type Params = {
    query: Partial<RequestQuery.Search & RequestQuery.Limit & RequestQuery.Page>
  }
  export type Result = DatabaseDocument.List<Product.Model>
}
