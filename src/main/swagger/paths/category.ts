import { OpenAPIV3 } from 'openapi-types'

export const addCategoryPath: OpenAPIV3.PathItemObject = {
  post: {
    tags: ['Categories'],
    summary: 'Adds a new category',
    description: 'This route adds a new category',
    requestBody: {
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              code: {
                type: 'string'
              },
              name: {
                type: 'string'
              }
            },
            required: ['name', 'code']
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
              $ref: '#/schemas/category'
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

export const findCategoryPath: OpenAPIV3.PathItemObject = {
  get: {
    tags: ['Categories'],
    summary: 'Requests a category information',
    description: 'This route finds a category by id',
    parameters: [
      {
        in: 'path',
        name: 'categoryId',
        description: 'Unique identifier of the category',
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
              $ref: '#/schemas/category'
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

export const findCategoriesPath: OpenAPIV3.PathItemObject = {
  get: {
    tags: ['Categories'],
    summary: 'Requests a category list',
    description: 'This route returns all categories or a filtered list of categories',
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
                    $ref: '#/schemas/category'
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

export const editCategoryPath: OpenAPIV3.PathItemObject = {
  put: {
    tags: ['Categories'],
    summary: 'Edits an existent category',
    description: 'This route edits an existent category',
    parameters: [
      {
        in: 'path',
        name: 'categoryId',
        description: 'Unique identifier of the category',
        required: true,
        schema: {
          type: 'string'
        }
      }
    ],
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
              code: {
                type: 'string'
              }
            }
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
              $ref: '#/schemas/category'
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
