import setupMiddlewares from './middlewares'
import setupRoutes from './routes'

import express from 'express'

export const buildApp = async (): Promise<express.Express> => {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
