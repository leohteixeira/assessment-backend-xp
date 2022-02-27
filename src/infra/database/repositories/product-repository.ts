import { DatabaseError } from '@/data/errors'
import { AddProductRepository, FindProductsRepository } from '@/data/protocols'
import { PgProduct, PgCategory } from '@/infra/database/entities'
import { PostgresHelper } from '@/infra/database/helpers'

import { getManager } from 'typeorm'

export class PgProductRepository implements AddProductRepository, FindProductsRepository {
  async add (params: AddProductRepository.Params): Promise<AddProductRepository.Result> {
    try {
      let product
      await getManager().transaction(async transactionalEntityManager => {
        const categories = []
        if (params.categoryId) {
          for (const categoryId of params.categoryId) {
            const category = await transactionalEntityManager.getRepository(PgCategory).findOne({ where: { id: categoryId } })
            if (!category) throw new DatabaseError.NotFound(`"${categoryId}" could not be found`)
            categories.push(category)
          }
        }

        product = await transactionalEntityManager.getRepository(PgProduct).save({
          name: params.name,
          sku: params.sku,
          price: params.price,
          description: params.description,
          quantity: params.quantity,
          categories: categories.length === 0 ? undefined : categories
        })
      })

      return product
    } catch (error) {
      if (error instanceof DatabaseError.NotFound) {
        throw error
      } else {
        throw new DatabaseError.InsertFail(String(error.stack))
      }
    }
  }

  async findProducts (params: FindProductsRepository.Params): Promise<FindProductsRepository.Result> {
    const productRepository = await PostgresHelper.getRepository(PgProduct)
    const page = (params.query.page && params.query.page > 0) ? params.query.page : 1
    const pageSize = params.query.limit ? params.query.limit : 20
    const skipSize = pageSize * (page - 1)

    let queryBuilder = productRepository.createQueryBuilder('product').leftJoinAndSelect('product.categories', 'categories')

    if (params.query.search && (params.query.searchValue || params.query.searchValue === 0)) {
      queryBuilder = queryBuilder.where(`product.${params.query.search} like :searchValue`, { searchValue: `%${params.query.searchValue}%` })
    }

    const result = await queryBuilder.skip(skipSize).take(pageSize).getManyAndCount()

    return {
      elements: result[0],
      totalElements: result[1],
      totalPages: result[1] === 0 ? 1 : Math.ceil(result[1] / pageSize),
      currentPage: page
    }
  }
}
