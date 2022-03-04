import { adaptRoute } from '@/main/adapters'
import { makeAddCategoryController, makeFindCategoryController, makeFindCategoriesController } from '@/main/factories/controllers'

import { Router } from 'express'

export const applyCategoryRoutes = (router: Router): void => {
  router.get('/categories', adaptRoute(makeFindCategoriesController()))
  router.get('/categories/:categoryId', adaptRoute(makeFindCategoryController()))
  router.post('/categories/add-category', adaptRoute(makeAddCategoryController()))
}
