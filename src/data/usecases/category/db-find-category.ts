import { FindCategoryRepository } from '@/data/protocols'
import { FindCategory } from '@/domain/usecases'

export class DbFindCategory implements FindCategory {
  constructor(
    private readonly findCategoryRepository: FindCategoryRepository
  ) {}

  async find(params: FindCategory.Params): Promise<FindCategory.Result> {
    const category = await this.findCategoryRepository.findCategory(params)
    return category
  }
}
