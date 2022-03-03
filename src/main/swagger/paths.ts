import {
  addProductPath,
  findProductsPath,
  findProductPath,
  editProductPath
} from './paths/'

export default {
  // Products
  '/products/add-product': addProductPath,
  '/products': findProductsPath,
  '/products/{productId}': findProductPath,
  '/products/edit-product/{productId}': editProductPath
}
