export namespace DatabaseDocument {
  export interface List<T> {
    elements: T[]
    totalElements: number
    totalPages: number
    currentPage: number
  }
}
