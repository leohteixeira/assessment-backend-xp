import { DatabaseError } from '@/data/errors'
import { PgCategory, PgProduct } from '@/infra/database/entities'
import { PostgresHelper } from '@/infra/database/helpers'
import { PgCategoryRepository } from '@/infra/database/repositories'
import { testEnv } from '@/tests/utils'

import { Repository } from 'typeorm'
import { datatype, random } from 'faker'
import MockDate from 'mockdate'
import path from 'path'

let categoryRepository: Repository<any>
let productRepository: Repository<any>

const makeSut = (): PgCategoryRepository => {
  return new PgCategoryRepository()
}

describe('PgCategoryRepository', () => {
  beforeAll(async () => {
    await PostgresHelper.connect(testEnv.postgresTestHost, testEnv.postgresTestPort, testEnv.postgresTestUsername, testEnv.postgresTestPassword, testEnv.postgresTestDatabase, [path.join(__dirname, '../../../../src/infra/database/entities/*{.js,.ts}')], true)
    MockDate.set(new Date())
  })

  afterAll(async () => {
    await PostgresHelper.disconnect()
    MockDate.reset()
  })

  beforeEach(async () => {
    categoryRepository = await PostgresHelper.getRepository(PgCategory)
    await categoryRepository.delete({})
    productRepository = await PostgresHelper.getRepository(PgProduct)
    await productRepository.delete({})
  })

  describe('add()', () => {
    test('Should throw DatabaseError.InsertFail if an unexpected error occurs', async () => {
      const sut = makeSut()
      const name = random.words()
      await categoryRepository.save({
        name: name,
        code: random.words()
      })
      const promise = sut.add({
        name: name,
        code: random.words()
      })
      await expect(promise).rejects.toThrowError(DatabaseError.InsertFail)
    })

    test('Should return a Category.Model on success', async () => {
      const sut = makeSut()
      const category = await sut.add({
        name: random.words(),
        code: random.words()
      })
      expect(category).toBeTruthy()
      expect(category.id).toBeTruthy()
    })
  })

  describe('findCategory()', () => {
    test('Should throw DatabaseError.NotFound if the category could not be found', async () => {
      const categoryId = datatype.uuid()
      const sut = makeSut()
      const promise = sut.findCategory({ categoryId })
      await expect(promise).rejects.toThrowError(DatabaseError.NotFound)
    })

    test('Should return Category.Model on success', async () => {
      const category = await categoryRepository.save({
        name: random.words(),
        code: random.words()
      })
      await productRepository.save({
        name: random.words(),
        sku: random.words(),
        price: datatype.number({ min: 1 }),
        description: random.words(),
        quantity: datatype.number({ min: 1 }),
        categories: [category]
      })
      const sut = makeSut()
      const foundCategory = await sut.findCategory({ categoryId: category.id })
      expect(foundCategory).toBeTruthy()
      expect(foundCategory.id).toBeTruthy()
      expect(foundCategory.id).toBe(category.id)
    })
  })
})
