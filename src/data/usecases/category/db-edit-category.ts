import { EditCategoryRepository } from '@/data/protocols'
import { EditCategory } from '@/domain/usecases'

export class DbEditCategory implements EditCategory {
  constructor(
    private readonly editCategoryRepository: EditCategoryRepository
  ) {}

  async edit(params: EditCategory.Params): Promise<EditCategory.Result> {
    const category = await this.editCategoryRepository.editCategory(params)
    return category
  }
}
