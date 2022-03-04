import { FindCategoriesRepository } from '@/data/protocols'
import { FindCategories } from '@/domain/usecases'

export class DbFindCategories implements FindCategories {
  constructor (private readonly findCategoriesRepository: FindCategoriesRepository) {}

  async find (params: FindCategories.Params): Promise<FindCategories.Result> {
    const result = await this.findCategoriesRepository.findCategories(params)
    return result
  }
}
