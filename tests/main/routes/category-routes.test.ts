/* eslint-disable @typescript-eslint/no-var-requires */
import { PgCategory } from '@/infra/database/entities'
import { PostgresHelper } from '@/infra/database/helpers'
import { buildApp } from '@/main/config'
import { testEnv } from '@/tests/utils'

import { random } from 'faker'
import path from 'path'
import request from 'supertest'
import { Repository } from 'typeorm'

let categoryRepository: Repository<any>

describe('Category Routes', () => {
  beforeAll(async () => {
    await PostgresHelper.connect(testEnv.postgresTestHost, testEnv.postgresTestPort, testEnv.postgresTestUsername, testEnv.postgresTestPassword, testEnv.postgresTestDatabase, [path.join(__dirname, '../../../src/infra/database/entities/*{.js,.ts}')], true)
  })

  afterAll(async () => {
    await PostgresHelper.disconnect()
  })

  beforeEach(async () => {
    categoryRepository = await PostgresHelper.getRepository(PgCategory)
    await categoryRepository.delete({})
  })

  describe('POST /categories/add-category', () => {
    test('Should return 200 on success', async () => {
      const app = await buildApp()
      await request(app)
        .post('/categories/add-category')
        .send({
          name: random.words(),
          code: random.words()
        })
        .expect(200)
    })
  })

  describe('GET /categories/:categoryId', () => {
    test('Should return 200 on success', async () => {
      const category = await categoryRepository.save({
        name: random.words(),
        code: random.words()
      })
      const app = await buildApp()
      await request(app)
        .get(`/categories/${category.id}`)
        .expect(200)
    })
  })

  describe('GET /categories', () => {
    test('Should return 200 on success', async () => {
      const app = await buildApp()
      await request(app)
        .get('/categories')
        .expect(200)
    })
  })
})
