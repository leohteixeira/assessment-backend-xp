import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupSwagger from './swagger'

import express from 'express'

export const buildApp = async (): Promise<express.Express> => {
  const app = express()
  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
