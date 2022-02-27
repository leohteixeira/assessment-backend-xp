import { Product } from '@/domain/models'
import { AddProduct } from '@/domain/usecases'

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
