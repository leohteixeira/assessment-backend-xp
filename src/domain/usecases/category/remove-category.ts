export interface RemoveCategory {
  remove: (params: RemoveCategory.Params) => Promise<RemoveCategory.Result>
}

export namespace RemoveCategory {
  export type Params = {
    categoryId: string
  }
  export type Result = void
}
