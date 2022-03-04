import { EditCategory } from '@/domain/usecases'

export interface EditCategoryRepository {
  editCategory: (params: EditCategoryRepository.Params) => Promise<EditCategoryRepository.Result>
}

export namespace EditCategoryRepository {
  export type Params = EditCategory.Params
  export type Result = EditCategory.Result
}
