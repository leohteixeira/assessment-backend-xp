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
let productsCategoriesCategoriesRepository: Repository<any>

const makeSut = (): PgCategoryRepository => {
  return new PgCategoryRepository()
}

describe('PgCategoryRepository', () => {
  beforeAll(async () => {
    await PostgresHelper.connect(testEnv.postgresHost, testEnv.postgresPort, testEnv.postgresUsername, testEnv.postgresPassword, testEnv.postgresDatabase, [path.join(__dirname, '../../../../src/infra/database/entities/*{.js,.ts}')], true)
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
    productsCategoriesCategoriesRepository = await PostgresHelper.getRepository('products_categories_categories')
    await productsCategoriesCategoriesRepository.delete({})
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

  describe('findCategories()', () => {
    test('Should return DatabaseDocument.List with an empty array of categories', async () => {
      const sut = makeSut()
      const result = await sut.findCategories({
        query: {}
      })
      expect(result.elements).toEqual([])
      expect(result.totalElements).toBe(0)
      expect(result.totalPages).toBe(1)
      expect(result.currentPage).toBe(1)
    })

    test('Should return DatabaseDocument.List with an array of categories', async () => {
      await categoryRepository.save({
        name: random.words(),
        code: random.words()
      })
      const sut = makeSut()
      let result = await sut.findCategories({
        query: {}
      })
      expect(result.elements.length).toBe(1)
      expect(result.totalElements).toBe(1)
      expect(result.totalPages).toBe(1)
      expect(result.currentPage).toBe(1)

      await categoryRepository.save({
        name: random.words(),
        code: random.words()
      })
      result = await sut.findCategories({
        query: {}
      })
      expect(result.elements.length).toBe(2)
      expect(result.totalElements).toBe(2)
      expect(result.totalPages).toBe(1)
      expect(result.currentPage).toBe(1)
    })

    test('Should return DatabaseDocument.List with an array of categories passing search filter', async () => {
      const category = await categoryRepository.save({
        name: random.words(),
        code: random.words()
      })

      await categoryRepository.save({
        name: random.words(),
        code: random.words()
      })

      const sut = makeSut()
      let result = await sut.findCategories({
        query: {
          search: 'name',
          searchValue: category.name
        }
      })
      expect(result.elements.length).toBe(1)
      expect(result.totalElements).toBe(1)
      expect(result.totalPages).toBe(1)
      expect(result.currentPage).toBe(1)

      result = await sut.findCategories({
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

    test('Should return DatabaseDocument.List with an array of categories passing pagination filters', async () => {
      await categoryRepository.save({
        name: random.words(),
        code: random.words()
      })
      await categoryRepository.save({
        name: random.words(),
        code: random.words()
      })
      const sut = makeSut()
      let result = await sut.findCategories({
        query: {
          limit: 1,
          page: 1
        }
      })
      expect(result.elements.length).toBe(1)
      expect(result.totalElements).toBe(2)
      expect(result.totalPages).toBe(2)
      expect(result.currentPage).toBe(1)

      result = await sut.findCategories({
        query: {
          limit: 1,
          page: 2
        }
      })
      expect(result.elements.length).toBe(1)
      expect(result.totalElements).toBe(2)
      expect(result.totalPages).toBe(2)
      expect(result.currentPage).toBe(2)

      result = await sut.findCategories({
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

  describe('editCategory()', () => {
    test('Should throw DatabaseError.UpdateFail if the update fails', async () => {
      const sut = makeSut()
      const promise = sut.editCategory({ categoryId: 'any_id' })
      await expect(promise).rejects.toThrowError(DatabaseError.UpdateFail)
    })

    test('Should return an updated category on success', async () => {
      const category = await categoryRepository.save({
        name: random.words(),
        code: random.words()
      })
      const editCategoryParams = {
        name: random.words(),
        code: random.words()
      }
      const sut = makeSut()
      const updatedCategory = await sut.editCategory({ categoryId: category.id, ...editCategoryParams })
      expect(updatedCategory).toBeTruthy()
      expect(updatedCategory.name).toBe(editCategoryParams.name)
      expect(updatedCategory.code).toBe(editCategoryParams.code)
    })
  })

  describe('removeCategory()', () => {
    test('Should throw DatabaseError.RemoveFail if the deletion fails', async () => {
      const sut = makeSut()
      const promise = sut.removeCategory({ categoryId: 'any_id' })
      await expect(promise).rejects.toThrowError(DatabaseError.RemoveFail)
    })

    test('Should remove a category on success', async () => {
      const category = await categoryRepository.save({
        name: random.words(),
        code: random.words()
      })
      const sut = makeSut()
      await sut.removeCategory({ categoryId: category.id })
      const removedCategory = await categoryRepository.findOne({ where: { id: category.id } })
      expect(removedCategory).toBeFalsy()
    })
  })
})
