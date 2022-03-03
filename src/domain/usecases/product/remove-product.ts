export interface RemoveProduct {
  remove: (params: RemoveProduct.Params) => Promise<RemoveProduct.Result>
}

export namespace RemoveProduct {
  export type Params = {
    productId: string
  }
  export type Result = void
}
