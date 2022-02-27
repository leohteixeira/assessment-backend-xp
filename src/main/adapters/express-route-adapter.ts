import { Http } from '@/presentation/protocols'

import { Request, Response } from 'express'

export const adaptRoute = (controller: Http.Controller) => {
  return async (req: Request, res: Response) => {
    const query = {}
    for (const key in req.query) {
      try {
        query[key] = JSON.parse(req.query[key] as any)
      } catch {
        query[key] = req.query[key]
      }
    }

    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
      ...query
    }

    const httpResponse = await controller.handle(request)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
