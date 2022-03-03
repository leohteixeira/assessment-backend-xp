import { Product } from '@/domain/models'
import { AddProduct, FindProducts, FindProduct, EditProduct } from '@/domain/usecases'

import { datatype, random, date } from 'faker'

export const mockProductModel = (): Product.Model => ({
  id: datatype.uuid(),
  name: random.words(),
  sku: random.words(),
  price: datatype.number(),
  description: random.words(),
  quantity: datatype.number(),
  createdAt: date.soon(),
  updatedAt: date.soon()
})

export const mockAddProductParams = (): AddProduct.Params => ({
  name: random.words(),
  sku: random.words(),
  price: datatype.number(),
  description: random.words(),
  quantity: datatype.number()
})

export const mockProductModels = (): Product.Model[] => [
  mockProductModel(),
  mockProductModel()
]

export const mockFindProductsParams = (): FindProducts.Params => ({
  query: {
    search: random.word(),
    searchValue: random.word(),
    limit: datatype.number(),
    page: datatype.number()
  }
})

export const mockFindProductParams = (): FindProduct.Params => ({
  productId: datatype.uuid()
})

export const mockEditProductParams = (): EditProduct.Params => ({
  productId: datatype.uuid(),
  name: random.words(),
  sku: random.words(),
  price: datatype.number(),
  description: random.words(),
  quantity: datatype.number(),
  categories: [datatype.uuid()]
})
