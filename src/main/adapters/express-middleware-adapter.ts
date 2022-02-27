import { Http } from '@/presentation/protocols'

import { Request, Response, NextFunction } from 'express'

export const adaptMiddleware = (middleware: Http.Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      ...(req.headers || {})
    }

    const authorization = req.headers.authorization
    if (authorization) {
      request.accessToken = authorization.toString().split(' ')[1]
    }

    const httpResponse = await middleware.handle(request)
    if (httpResponse.statusCode === 200) {
      Object.assign(req.body, httpResponse.body)
      next()
    } else {
      res.status(httpResponse.statusCode).json(httpResponse.body)
    }
  }
}
