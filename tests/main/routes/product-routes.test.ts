/* eslint-disable @typescript-eslint/no-var-requires */
import { PgProduct } from '@/infra/database/entities'
import { PostgresHelper } from '@/infra/database/helpers/postgres-helper'
import { buildApp } from '@/main/config'
import { testEnv } from '@/tests/utils'

import { datatype, random } from 'faker'
import path from 'path'
import request from 'supertest'
import { Repository } from 'typeorm'

let productRepository: Repository<any>
let productsCategoriesCategoriesRepository: Repository<any>

describe('Product Routes', () => {
  beforeAll(async () => {
    await PostgresHelper.connect(testEnv.postgresTestHost, testEnv.postgresTestPort, testEnv.postgresTestUsername, testEnv.postgresTestPassword, testEnv.postgresTestDatabase, [path.join(__dirname, '../../../src/infra/database/entities/*{.js,.ts}')], true)
  })

  afterAll(async () => {
    await PostgresHelper.disconnect()
  })

  beforeEach(async () => {
    productsCategoriesCategoriesRepository = await PostgresHelper.getRepository('products_categories_categories')
    await productsCategoriesCategoriesRepository.delete({})
    productRepository = await PostgresHelper.getRepository(PgProduct)
    await productRepository.delete({})
  })

  describe('POST /products/add-product', () => {
    test('Should return 200 on success', async () => {
      const app = await buildApp()
      await request(app)
        .post('/products/add-product')
        .send({
          name: random.words(),
          sku: random.words(),
          price: datatype.number(),
          description: random.words(),
          quantity: datatype.number()
        })
        .expect(200)
    })
  })

  describe('GET /products', () => {
    test('Should return 200 on success', async () => {
      const app = await buildApp()
      await request(app)
        .get('/products')
        .expect(200)
    })
  })

  describe('GET /products/:productId', () => {
    test('Should return 200 on success', async () => {
      const product = await productRepository.save({
        name: random.words(),
        sku: random.words(),
        price: datatype.number(),
        description: random.words(),
        quantity: datatype.number()
      })
      const app = await buildApp()
      await request(app)
        .get(`/products/${product.id}`)
        .expect(200)
    })
  })

  describe('PUT /products/add-product', () => {
    test('Should return 200 on success', async () => {
      const product = await productRepository.save({
        name: random.words(),
        sku: random.words(),
        price: datatype.number(),
        description: random.words(),
        quantity: datatype.number()
      })
      const app = await buildApp()
      await request(app)
        .put(`/products/edit-product/${product.id}`)
        .send({
          name: random.words(),
          sku: random.words(),
          price: datatype.number(),
          description: random.words(),
          quantity: datatype.number()
        })
        .expect(200)
    })
  })
})
