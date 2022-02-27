import { DatabaseError } from '@/data/errors'
import { AddProductRepository } from '@/data/protocols'
import { PgProduct, PgCategory } from '@/infra/database/entities'

import { getManager } from 'typeorm'

export class PgProductRepository implements AddProductRepository {
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
}
