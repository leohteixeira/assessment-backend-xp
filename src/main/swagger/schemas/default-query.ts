import { OpenAPIV3 } from 'openapi-types'

export const searchQuery: OpenAPIV3.ParameterObject = {
  in: 'query',
  name: 'search',
  schema: {
    type: 'string'
  },
  description: 'The key that will be searched'
}

export const searchValueQuery: OpenAPIV3.ParameterObject = {
  in: 'query',
  name: 'searchValue',
  schema: {
    type: 'string'
  },
  description: 'The value that will be searched in given key'
}

export const limitQuery: OpenAPIV3.ParameterObject = {
  in: 'query',
  name: 'limit',
  schema: {
    type: 'number'
  },
  description: 'The number of results that will be returned, minimal value is 1'
}

export const pageQuery: OpenAPIV3.ParameterObject = {
  in: 'query',
  name: 'page',
  schema: {
    type: 'number'
  },
  description: 'The number of the page'
}
