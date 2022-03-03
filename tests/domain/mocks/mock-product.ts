import { Product } from '@/domain/models'
import { AddProduct, FindProducts, FindProduct, EditProduct } from '@/domain/usecases'

import { datatype, random, date } from 'faker'

export const mockProductModel = (): Product.Model => ({
  id: datatype.uuid(),
  name: random.words(),
  sku: random.words(),
  price: datatype.number({ min: 1 }),
  description: random.words(),
  quantity: datatype.number({ min: 1 }),
  createdAt: date.soon(),
  updatedAt: date.soon()
})

export const mockAddProductParams = (): AddProduct.Params => ({
  name: random.words(),
  sku: random.words(),
  price: datatype.number({ min: 1 }),
  description: random.words(),
  quantity: datatype.number({ min: 1 })
})

export const mockProductModels = (): Product.Model[] => [
  mockProductModel(),
  mockProductModel()
]

export const mockFindProductsParams = (): FindProducts.Params => ({
  query: {
    search: random.word(),
    searchValue: random.word(),
    limit: datatype.number({ min: 1 }),
    page: datatype.number({ min: 1 })
  }
})

export const mockFindProductParams = (): FindProduct.Params => ({
  productId: datatype.uuid()
})

export const mockEditProductParams = (): EditProduct.Params => ({
  productId: datatype.uuid(),
  name: random.words(),
  sku: random.words(),
  price: datatype.number({ min: 1 }),
  description: random.words(),
  quantity: datatype.number({ min: 1 }),
  categories: [datatype.uuid()]
})
