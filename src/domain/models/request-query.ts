export namespace RequestQuery {
  export interface Search {
    search: string
    searchValue: string | number
    invert?: boolean
  }

  export interface Limit {
    limit: number
  }

  export interface Page {
    page: number
  }

  export interface Default extends Partial<Search & Limit & Page> {}
}
