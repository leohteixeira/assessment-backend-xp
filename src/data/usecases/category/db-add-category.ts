import { AddCategoryRepository } from '@/data/protocols'
import { AddCategory } from '@/domain/usecases'

export class DbAddCategory implements AddCategory {
  constructor (
    private readonly addCategoryRepository: AddCategoryRepository
  ) {}

  async add (params: AddCategory.Params): Promise<AddCategory.Result> {
    const category = await this.addCategoryRepository.add(params)
    return category
  }
}
