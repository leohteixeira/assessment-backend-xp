import {
  productsPath,
  findProductsPath,
  findProductPath
} from './paths/'

export default {
  // Products
  '/products/add-product': productsPath,
  '/products': findProductsPath,
  '/products/{productId}': findProductPath
}
