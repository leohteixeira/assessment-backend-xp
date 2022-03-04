import { FindCategory } from '@/domain/usecases'

export interface FindCategoryRepository {
  findCategory: (params: FindCategoryRepository.Params) => Promise<FindCategoryRepository.Result>
}

export namespace FindCategoryRepository {
  export type Params = FindCategory.Params
  export type Result = FindCategory.Result
}
