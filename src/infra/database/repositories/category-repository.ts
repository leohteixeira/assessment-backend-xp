import { DatabaseError } from '@/data/errors'
import { AddCategoryRepository, FindCategoryRepository, FindCategoriesRepository, EditCategoryRepository, RemoveCategoryRepository } from '@/data/protocols'
import { PgCategory } from '@/infra/database/entities'
import { PostgresHelper } from '@/infra/database/helpers'

export class PgCategoryRepository implements AddCategoryRepository, FindCategoryRepository, FindCategoriesRepository, EditCategoryRepository, RemoveCategoryRepository {
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

  async findCategories (params: FindCategoriesRepository.Params): Promise<FindCategoriesRepository.Result> {
    const categoryRepository = await PostgresHelper.getRepository(PgCategory)
    const page = (params.query.page && params.query.page > 0) ? params.query.page : 1
    const pageSize = params.query.limit ? params.query.limit : 20
    const skipSize = pageSize * (page - 1)

    let queryBuilder = categoryRepository.createQueryBuilder('category')

    if (params.query.search && (params.query.searchValue || params.query.searchValue === 0)) {
      queryBuilder = queryBuilder.where(`category.${params.query.search} like :searchValue`, { searchValue: `%${params.query.searchValue}%` })
    }

    const result = await queryBuilder.skip(skipSize).take(pageSize).getManyAndCount()

    return {
      elements: result[0],
      totalElements: result[1],
      totalPages: result[1] === 0 ? 1 : Math.ceil(result[1] / pageSize),
      currentPage: page
    }
  }

  async editCategory (params: EditCategoryRepository.Params): Promise<EditCategoryRepository.Result> {
    try {
      const categoryRepository = await PostgresHelper.getRepository(PgCategory)
      const category = await categoryRepository.findOne({ where: { id: params.categoryId } })

      // Update category
      if (params.name) category.name = params.name
      if (params.code) category.code = params.code

      const result = await categoryRepository.save(category)

      return result
    } catch (error) {
      throw new DatabaseError.UpdateFail()
    }
  }

  async removeCategory (params: RemoveCategoryRepository.Params): Promise<RemoveCategoryRepository.Result> {
    try {
      const categoryRepository = await PostgresHelper.getRepository(PgCategory)
      await categoryRepository
        .createQueryBuilder()
        .delete()
        .from(PgCategory)
        .where({ id: params.categoryId })
        .execute()
    } catch (error) {
      throw new DatabaseError.RemoveFail(String(error.stack))
    }
  }
}
