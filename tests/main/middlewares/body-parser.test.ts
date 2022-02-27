import { buildApp } from '@/main/config/app'

import request from 'supertest'

describe('Body Parser Middleware', () => {
  test('Should parse body as json', async () => {
    const app = await buildApp()
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'any_name' })
      .expect({ name: 'any_name' })
  })
})
