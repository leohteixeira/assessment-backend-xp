import { DatabaseError } from '@/data/errors'
import { AddCategoryRepository, FindCategoryRepository } from '@/data/protocols'
import { PgCategory } from '@/infra/database/entities'
import { PostgresHelper } from '@/infra/database/helpers'

export class PgCategoryRepository implements AddCategoryRepository, FindCategoryRepository {
  async add (params: AddCategoryRepository.Params): Promise<AddCategoryRepository.Result> {
    try {
      const categoryRepository = await PostgresHelper.getRepository(PgCategory)
      return await categoryRepository.save({ ...params })
    } catch (error) {
      throw new DatabaseError.InsertFail(String(error.stack))
    }
  }

  async findCategory (params: FindCategoryRepository.Params): Promise<FindCategoryRepository.Result> {
    const categoryRepository = await PostgresHelper.getRepository(PgCategory)

    const category = await categoryRepository.findOne({
      join: { alias: 'category', leftJoinAndSelect: { products: 'category.products' } },
      where: { id: params.categoryId }
    })

    if (!category) throw new DatabaseError.NotFound(`"${params.categoryId}" could not be found`)
    return category
  }
}
