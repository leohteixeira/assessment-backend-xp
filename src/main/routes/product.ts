import { adaptRoute } from '@/main/adapters'
import { makeAddProductController, makeFindProductsController, makeFindProductController } from '@/main/factories/controllers'

import { Router } from 'express'

export const applyProductRoutes = (router: Router): void => {
  router.get('/products', adaptRoute(makeFindProductsController()))
  router.get('/products/:productId', adaptRoute(makeFindProductController()))
  router.post('/products/add-product', adaptRoute(makeAddProductController()))
}
