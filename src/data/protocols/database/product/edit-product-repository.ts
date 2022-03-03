import { EditProduct } from '@/domain/usecases'

export interface EditProductRepository {
  editProduct: (params: EditProductRepository.Params) => Promise<EditProductRepository.Result>
}

export namespace EditProductRepository {
  export type Params = EditProduct.Params
  export type Result = EditProduct.Result
}
