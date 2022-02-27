import { Router } from 'express'

export const applyConfigRoutes = (router: Router): void => {
  router.get('/', (req, res) => {
    res.send('Running')
  })
}
