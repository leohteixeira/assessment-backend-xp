import { adaptRoute } from '@/main/adapters'
import { makeAddProductController, makeFindProductsController } from '@/main/factories/controllers'

import { Router } from 'express'

export const applyProductRoutes = (router: Router): void => {
  router.get('/products', adaptRoute(makeFindProductsController()))
  router.post('/products/add-product', adaptRoute(makeAddProductController()))
}
