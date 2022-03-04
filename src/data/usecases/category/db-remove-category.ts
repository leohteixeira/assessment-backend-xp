import { RemoveCategoryRepository } from '@/data/protocols'
import { RemoveCategory } from '@/domain/usecases'

export class DbRemoveCategory implements RemoveCategory {
  constructor (
    private readonly removeCategoryRepository: RemoveCategoryRepository
  ) {}

  async remove (params: RemoveCategory.Params): Promise<RemoveCategory.Result> {
    await this.removeCategoryRepository.removeCategory(params)
  }
}
