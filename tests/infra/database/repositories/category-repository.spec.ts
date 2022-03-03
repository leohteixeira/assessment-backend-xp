import { DatabaseError } from '@/data/errors'
import { PgCategory } from '@/infra/database/entities'
import { PostgresHelper } from '@/infra/database/helpers'
import { PgCategoryRepository } from '@/infra/database/repositories'
import { testEnv } from '@/tests/utils'

import { Repository } from 'typeorm'
import { random } from 'faker'
import MockDate from 'mockdate'
import path from 'path'

let categoryRepository: Repository<any>

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
})
