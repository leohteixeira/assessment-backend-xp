import { adaptRoute } from '@/main/adapters'
import { makeAddCategoryController } from '@/main/factories/controllers'

import { Router } from 'express'

export const applyCategoryRoutes = (router: Router): void => {
  router.post('/categories/add-category', adaptRoute(makeAddCategoryController()))
}
