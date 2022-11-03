import { RemoveCategory } from '@/domain/usecases'

export interface RemoveCategoryRepository {
  removeCategory: (
    params: RemoveCategoryRepository.Params
  ) => Promise<RemoveCategoryRepository.Result>
}

export namespace RemoveCategoryRepository {
  export type Params = RemoveCategory.Params
  export type Result = RemoveCategory.Result
}
