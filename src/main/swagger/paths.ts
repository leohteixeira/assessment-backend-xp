import {
  addProductPath,
  findProductsPath,
  findProductPath,
  editProductPath,
  deleteProductPath,
  addCategoryPath,
  findCategoryPath,
  findCategoriesPath,
  editCategoryPath,
  deleteCategoryPath
} from './paths/'

export default {
  // Products
  '/products/add-product': addProductPath,
  '/products': findProductsPath,
  '/products/{productId}': findProductPath,
  '/products/edit-product/{productId}': editProductPath,
  '/products/delete-product/{productId}': deleteProductPath,

  // Categories
  '/categories/add-category': addCategoryPath,
  '/categories/{categoryId}': findCategoryPath,
  '/categories': findCategoriesPath,
  '/categories/edit-category/{categoryId}': editCategoryPath,
  '/categories/delete-category/{categoryId}': deleteCategoryPath
}
