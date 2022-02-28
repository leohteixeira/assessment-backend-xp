import { DatabaseError } from '@/data/errors'
import { PgProduct, PgCategory } from '@/infra/database/entities'
import { PostgresHelper } from '@/infra/database/helpers'
import { PgProductRepository } from '@/infra/database/repositories'
import { testEnv } from '@/tests/utils'

import { Repository } from 'typeorm'
import { random, datatype } from 'faker'
import MockDate from 'mockdate'
import path from 'path'

let productRepository: Repository<any>
let categoryRepository: Repository<any>
let productsCategoriesCategoriesRepository: Repository<any>

const makeSut = (): PgProductRepository => {
  return new PgProductRepository()
}

describe('PgProductRepository', () => {
  beforeAll(async () => {
    await PostgresHelper.connect(testEnv.postgresTestHost, testEnv.postgresTestPort, testEnv.postgresTestUsername, testEnv.postgresTestPassword, testEnv.postgresTestDatabase, [path.join(__dirname, '../../../../src/infra/database/entities/*{.js,.ts}')], true)
    MockDate.set(new Date())
  })

  afterAll(async () => {
    await PostgresHelper.disconnect()
    MockDate.reset()
  })

  beforeEach(async () => {
    productsCategoriesCategoriesRepository = await PostgresHelper.getRepository('products_categories_categories')
    await productsCategoriesCategoriesRepository.delete({})
    productRepository = await PostgresHelper.getRepository(PgProduct)
    await productRepository.delete({})
    categoryRepository = await PostgresHelper.getRepository(PgCategory)
    await categoryRepository.delete({})
  })

  describe('add()', () => {
    test('Should throw DatabaseError.NotFound if the category could not be found', async () => {
      const sut = makeSut()
      const categoryId = datatype.uuid()
      const promise = sut.add({
        name: random.words(),
        sku: random.words(),
        price: datatype.number(),
        description: random.words(),
        quantity: datatype.number(),
        categoryId: [categoryId]
      })
      await expect(promise).rejects.toThrow(new DatabaseError.NotFound(`"${categoryId}" could not be found`))
    })

    test('Should throw DatabaseError.InsertFail if an unexpected error occurs', async () => {
      const sut = makeSut()
      const name = random.words()
      await productRepository.save({
        name: name,
        sku: random.words(),
        price: datatype.number(),
        description: random.words(),
        quantity: datatype.number()
      })
      const promise = sut.add({
        name: name,
        sku: random.words(),
        price: datatype.number(),
        description: random.words(),
        quantity: datatype.number()
      })
      await expect(promise).rejects.toThrowError(DatabaseError.InsertFail)
    })

    test('Should return an Product.Model on success', async () => {
      const sut = makeSut()
      const product = await sut.add({
        name: random.words(),
        sku: random.words(),
        price: datatype.number(),
        description: random.words(),
        quantity: datatype.number()
      })
      expect(product).toBeTruthy()
      expect(product.id).toBeTruthy()
    })

    test('Should return an Product.Model on success if there is a category', async () => {
      const sut = makeSut()
      const category = await categoryRepository.save({
        name: random.words(),
        code: random.words()
      })
      const product = await sut.add({
        name: random.words(),
        sku: random.words(),
        price: datatype.number(),
        description: random.words(),
        quantity: datatype.number(),
        categoryId: [category.id]
      })
      expect(product).toBeTruthy()
      expect(product.id).toBeTruthy()
      expect(product.categories.length).toBe(1)
    })
  })

  describe('findProducts()', () => {
    test('Should return DatabaseDocument.List with an empty array of products', async () => {
      const sut = makeSut()
      const result = await sut.findProducts({
        query: {}
      })
      expect(result.elements).toEqual([])
      expect(result.totalElements).toBe(0)
      expect(result.totalPages).toBe(1)
      expect(result.currentPage).toBe(1)
    })

    test('Should return DatabaseDocument.List with an array of products', async () => {
      await productRepository.save({
        name: random.words(),
        sku: random.words(),
        price: datatype.number(),
        description: random.words(),
        quantity: datatype.number()
      })
      const sut = makeSut()
      let result = await sut.findProducts({
        query: {}
      })
      expect(result.elements.length).toBe(1)
      expect(result.totalElements).toBe(1)
      expect(result.totalPages).toBe(1)
      expect(result.currentPage).toBe(1)

      await productRepository.save({
        name: random.words(),
        sku: random.words(),
        price: datatype.number(),
        description: random.words(),
        quantity: datatype.number()
      })
      result = await sut.findProducts({
        query: {}
      })
      expect(result.elements.length).toBe(2)
      expect(result.totalElements).toBe(2)
      expect(result.totalPages).toBe(1)
      expect(result.currentPage).toBe(1)
    })

    test('Should return DatabaseDocument.List with an array of products passing search filter', async () => {
      const category = await categoryRepository.save({
        name: random.words(),
        code: random.words()
      })
      const product = await productRepository.save({
        name: random.words(),
        sku: random.words(),
        price: datatype.number(),
        description: random.words(),
        quantity: datatype.number(),
        categories: [category]
      })

      await productRepository.save({
        name: random.words(),
        sku: random.words(),
        price: datatype.number(),
        description: random.words(),
        quantity: datatype.number()
      })

      const sut = makeSut()
      let result = await sut.findProducts({
        query: {
          search: 'name',
          searchValue: product.name
        }
      })
      expect(result.elements.length).toBe(1)
      expect(result.totalElements).toBe(1)
      expect(result.totalPages).toBe(1)
      expect(result.currentPage).toBe(1)

      result = await sut.findProducts({
        query: {
          search: 'name',
          searchValue: 'wrong_name'
        }
      })
      expect(result.elements.length).toBe(0)
      expect(result.totalElements).toBe(0)
      expect(result.totalPages).toBe(1)
      expect(result.currentPage).toBe(1)
    })

    test('Should return DatabaseDocument.List with an array of products passing pagination filters', async () => {
      await productRepository.save({
        name: random.words(),
        sku: random.words(),
        price: datatype.number(),
        description: random.words(),
        quantity: datatype.number()
      })
      await productRepository.save({
        name: random.words(),
        sku: random.words(),
        price: datatype.number(),
        description: random.words(),
        quantity: datatype.number()
      })
      const sut = makeSut()
      let result = await sut.findProducts({
        query: {
          limit: 1,
          page: 1
        }
      })
      expect(result.elements.length).toBe(1)
      expect(result.totalElements).toBe(2)
      expect(result.totalPages).toBe(2)
      expect(result.currentPage).toBe(1)

      result = await sut.findProducts({
        query: {
          limit: 1,
          page: 2
        }
      })
      expect(result.elements.length).toBe(1)
      expect(result.totalElements).toBe(2)
      expect(result.totalPages).toBe(2)
      expect(result.currentPage).toBe(2)

      result = await sut.findProducts({
        query: {
          limit: 1,
          page: 3
        }
      })
      expect(result.elements.length).toBe(0)
      expect(result.totalElements).toBe(2)
      expect(result.totalPages).toBe(2)
      expect(result.currentPage).toBe(3)
    })
  })

  describe('findProduct()', () => {
    test('Should throw DatabaseError.NotFound if the product could not be found', async () => {
      const productId = datatype.uuid()
      const sut = makeSut()
      const promise = sut.findProduct({ productId })
      await expect(promise).rejects.toThrowError(DatabaseError.NotFound)
    })

    test('Should return Product.Model on success', async () => {
      const category = await categoryRepository.save({
        name: random.words(),
        code: random.words()
      })
      const product = await productRepository.save({
        name: random.words(),
        sku: random.words(),
        price: datatype.number(),
        description: random.words(),
        quantity: datatype.number(),
        categories: [category]
      })
      const sut = makeSut()
      const foundProduct = await sut.findProduct({ productId: product.id })
      expect(foundProduct).toBeTruthy()
      expect(foundProduct.id).toBeTruthy()
    })
  })
})
