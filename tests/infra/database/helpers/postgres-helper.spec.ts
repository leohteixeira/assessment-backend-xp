import { PgProduct } from '@/infra/database/entities'
import { PostgresHelper as sut } from '@/infra/database/helpers'
import { env } from '@/main/config'

import path from 'path'

describe('Postgres Helper', () => {
  beforeAll(async () => {
    await sut.connect(env.postgresHost, env.postgresPort, env.postgresUsername, env.postgresPassword, env.postgresDatabase, [path.join(__dirname, '../../../../src/infra/database/entities/*{.js,.ts}')], true)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  beforeEach(async () => {
    const adminRepository = await sut.getRepository(PgProduct)
    await adminRepository.delete({})
  })

  test('Should reconnect if postgres is down', async () => {
    let adminRepository = await sut.getRepository(PgProduct)
    expect(adminRepository).toBeTruthy()
    await sut.disconnect()
    adminRepository = await sut.getRepository(PgProduct)
    expect(adminRepository).toBeTruthy()
    expect(1).toBe(1)
  })
})
