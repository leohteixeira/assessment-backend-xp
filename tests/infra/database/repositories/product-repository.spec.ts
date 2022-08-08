import { DatabaseError } from '@/data/errors'
import { PgProduct, PgCategory } from '@/infra/database/entities'
import { PostgresHelper } from '@/infra/database/helpers'
import { PgProductRepository } from '@/infra/database/repositories'
import { env } from '@/main/config'

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
    await PostgresHelper.connect(env.postgresHost, env.postgresPort, env.postgresUsername, env.postgresPassword, env.postgresDatabase, [path.join(__dirname, '../../../../src/infra/database/entities/*{.js,.ts}')], true)
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
        price: datatype.number({ min: 1 }),
        description: random.words(),
        quantity: datatype.number({ min: 1 }),
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
        price: datatype.number({ min: 1 }),
        description: random.words(),
        quantity: datatype.number({ min: 1 })
      })
      const promise = sut.add({
        name: name,
        sku: random.words(),
        price: datatype.number({ min: 1 }),
        description: random.words(),
        quantity: datatype.number({ min: 1 })
      })
      await expect(promise).rejects.toThrowError(DatabaseError.InsertFail)
    })

    test('Should return an Product.Model on success', async () => {
      const sut = makeSut()
      const product = await sut.add({
        name: random.words(),
        sku: random.words(),
        price: datatype.number({ min: 1 }),
        description: random.words(),
        quantity: datatype.number({ min: 1 })
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
        price: datatype.number({ min: 1 }),
        description: random.words(),
        quantity: datatype.number({ min: 1 }),
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
        price: datatype.number({ min: 1 }),
        description: random.words(),
        quantity: datatype.number({ min: 1 })
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
        price: datatype.number({ min: 1 }),
        description: random.words(),
        quantity: datatype.number({ min: 1 })
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
        price: datatype.number({ min: 1 }),
        description: random.words(),
        quantity: datatype.number({ min: 1 }),
        categories: [category]
      })

      await productRepository.save({
        name: random.words(),
        sku: random.words(),
        price: datatype.number({ min: 1 }),
        description: random.words(),
        quantity: datatype.number({ min: 1 })
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
        price: datatype.number({ min: 1 }),
        description: random.words(),
        quantity: datatype.number({ min: 1 })
      })
      await productRepository.save({
        name: random.words(),
        sku: random.words(),
        price: datatype.number({ min: 1 }),
        description: random.words(),
        quantity: datatype.number({ min: 1 })
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
        price: datatype.number({ min: 1 }),
        description: random.words(),
        quantity: datatype.number({ min: 1 }),
        categories: [category]
      })
      const sut = makeSut()
      const foundProduct = await sut.findProduct({ productId: product.id })
      expect(foundProduct).toBeTruthy()
      expect(foundProduct.id).toBeTruthy()
    })
  })

  describe('editProduct()', () => {
    test('Should throw DatabaseError.UpdateFail if the update fails', async () => {
      const product = await productRepository.save({
        name: random.words(),
        sku: random.words(),
        price: datatype.number({ min: 1 }),
        description: random.words(),
        quantity: datatype.number({ min: 1 })
      })
      const sut = makeSut()
      const promise = sut.editProduct({ productId: product.id, categories: ['any_id'] })
      await expect(promise).rejects.toThrowError(DatabaseError.UpdateFail)
    })

    test('Should return an updated product on success', async () => {
      const category = await categoryRepository.save({
        name: random.words(),
        code: random.words()
      })
      const category2 = await categoryRepository.save({
        name: random.words(),
        code: random.words()
      })
      const product = await productRepository.save({
        name: random.words(),
        sku: random.words(),
        price: datatype.number({ min: 1 }),
        description: random.words(),
        quantity: datatype.number({ min: 1 }),
        categories: [category]
      })
      const editProductParams = {
        name: random.words(),
        sku: random.words(),
        price: datatype.number({ min: 1 }),
        description: random.words(),
        quantity: datatype.number({ min: 1 }),
        categories: [category, category2]
      }
      const sut = makeSut()
      const updatedProduct = await sut.editProduct({ productId: product.id, ...editProductParams })
      expect(updatedProduct).toBeTruthy()
      expect(updatedProduct.name).toBe(editProductParams.name)
      expect(updatedProduct.sku).toBe(editProductParams.sku)
      expect(updatedProduct.price).toBe(editProductParams.price)
      expect(updatedProduct.description).toBe(editProductParams.description)
      expect(updatedProduct.quantity).toBe(editProductParams.quantity)
      expect(updatedProduct.categories.length).toBe(2)
    })
  })

  describe('removeProduct()', () => {
    test('Should throw DatabaseError.RemoveFail if the deletion fails', async () => {
      const sut = makeSut()
      const promise = sut.removeProduct({ productId: 'any_id' })
      await expect(promise).rejects.toThrowError(DatabaseError.RemoveFail)
    })

    test('Should remove a product on success', async () => {
      const product = await productRepository.save({
        name: random.words(),
        sku: random.words(),
        price: datatype.number({ min: 1 }),
        description: random.words(),
        quantity: datatype.number({ min: 1 })
      })
      const sut = makeSut()
      await sut.removeProduct({ productId: product.id })
      const removedProduct = await productRepository.findOne({ where: { id: product.id } })
      expect(removedProduct).toBeFalsy()
    })
  })
})
