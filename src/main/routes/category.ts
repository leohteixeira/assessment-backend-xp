import { adaptRoute } from '@/main/adapters'
import { makeAddCategoryController, makeFindCategoryController, makeFindCategoriesController, makeEditCategoryController, makeRemoveCategoryController } from '@/main/factories/controllers'

import { Router } from 'express'

export const applyCategoryRoutes = (router: Router): void => {
  router.get('/categories', adaptRoute(makeFindCategoriesController()))
  router.get('/categories/:categoryId', adaptRoute(makeFindCategoryController()))
  router.post('/categories/add-category', adaptRoute(makeAddCategoryController()))
  router.put('/categories/edit-category/:categoryId', adaptRoute(makeEditCategoryController()))
  router.delete('/categories/delete-category/:categoryId', adaptRoute(makeRemoveCategoryController()))
}
