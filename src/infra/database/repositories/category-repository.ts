import { DatabaseError } from '@/data/errors'
import { AddCategoryRepository } from '@/data/protocols'
import { PgCategory } from '@/infra/database/entities'
import { PostgresHelper } from '@/infra/database/helpers'

export class PgCategoryRepository implements AddCategoryRepository {
  async add (params: AddCategoryRepository.Params): Promise<AddCategoryRepository.Result> {
    try {
      const categoryRepository = await PostgresHelper.getRepository(PgCategory)
      return await categoryRepository.save({ ...params })
    } catch (error) {
      throw new DatabaseError.InsertFail(String(error.stack))
    }
  }
}
