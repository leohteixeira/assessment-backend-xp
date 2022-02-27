import { adaptRoute } from '@/main/adapters'
import { makeAddProductController } from '@/main/factories/controllers'

import { Router } from 'express'

export const applyGroupRoutes = (router: Router): void => {
  router.post('/products/add-product', adaptRoute(makeAddProductController()))
}
