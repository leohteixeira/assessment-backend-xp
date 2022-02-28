import { OpenAPIV3 } from 'openapi-types'

export const productsPath: OpenAPIV3.PathItemObject = {
  post: {
    tags: ['Products'],
    summary: 'Adds a new product',
    description: 'This route adds a new product',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              name: {
                type: 'string'
              },
              sku: {
                type: 'string'
              },
              price: {
                type: 'number'
              },
              description: {
                type: 'string'
              },
              quantity: {
                type: 'number'
              },
              categoryId: {
                type: 'array',
                items: {
                  type: 'string'
                }
              }
            },
            required: ['name', 'sku', 'price', 'description', 'quantity']
          }
        }
      }
    },
    responses: {
      200: {
        description: 'Ok',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/product'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}

export const findProductsPath: OpenAPIV3.PathItemObject = {
  get: {
    tags: ['Products'],
    summary: 'Requests a product list',
    description: 'This route returns all products or a filtered list of products',
    parameters: [
      'searchQuery',
      'searchValueQuery',
      'limitQuery',
      'pageQuery'
    ].map((param) => ({ $ref: `#/schemas/${param}` })),
    responses: {
      200: {
        description: 'Ok',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                elements: {
                  type: 'array',
                  items: {
                    $ref: '#/schemas/product'
                  }
                },
                totalElements: {
                  type: 'number'
                },
                totalPages: {
                  type: 'number'
                },
                currentPage: {
                  type: 'number'
                }
              },
              required: ['elements', 'totalElements', 'totalPages', 'currentPage']
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}

export const findProductPath: OpenAPIV3.PathItemObject = {
  get: {
    tags: ['Products'],
    summary: 'Requests a product information',
    description: 'This route finds a product by id',
    parameters: [
      {
        in: 'path',
        name: 'productId',
        description: 'Unique identifier of the product',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
    responses: {
      200: {
        description: 'Ok',
        content: {
          'application/json': {
            schema: {
              $ref: '#/schemas/product'
            }
          }
        }
      },
      400: {
        $ref: '#/components/badRequest'
      },
      500: {
        $ref: '#/components/serverError'
      }
    }
  }
}
