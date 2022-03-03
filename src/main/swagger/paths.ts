import {
  addProductPath,
  findProductsPath,
  findProductPath,
  editProductPath,
  deleteProductPath,
  addCategoryPath
} from './paths/'

export default {
  // Products
  '/products/add-product': addProductPath,
  '/products': findProductsPath,
  '/products/{productId}': findProductPath,
  '/products/edit-product/{productId}': editProductPath,
  '/products/delete-product/{productId}': deleteProductPath,

  // Categories
  '/categories/add-category': addCategoryPath
}
