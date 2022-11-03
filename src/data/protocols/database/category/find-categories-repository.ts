import { FindCategories } from '@/domain/usecases'

export interface FindCategoriesRepository {
  findCategories: (
    params: FindCategoriesRepository.Params
  ) => Promise<FindCategoriesRepository.Result>
}

export namespace FindCategoriesRepository {
  export type Params = FindCategories.Params
  export type Result = FindCategories.Result
}
