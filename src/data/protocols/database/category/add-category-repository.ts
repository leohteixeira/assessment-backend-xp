import { AddCategory } from '@/domain/usecases'

export interface AddCategoryRepository {
  add: (
    params: AddCategoryRepository.Params
  ) => Promise<AddCategoryRepository.Result>
}

export namespace AddCategoryRepository {
  export type Params = AddCategory.Params
  export type Result = AddCategory.Result
}
