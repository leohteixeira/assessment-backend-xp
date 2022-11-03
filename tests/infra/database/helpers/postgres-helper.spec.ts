import { PgProduct } from '@/infra/database/entities'
import { PostgresHelper as sut } from '@/infra/database/helpers'
import { testEnv } from '@/tests/utils'

import path from 'path'

describe('Postgres Helper', () => {
  beforeAll(async () => {
    await sut.connect(
      testEnv.postgresHost,
      testEnv.postgresPort,
      testEnv.postgresUsername,
      testEnv.postgresPassword,
      testEnv.postgresDatabase,
      testEnv.postgresSchema,
      [
        path.join(
          __dirname,
          '../../../../src/infra/database/entities/*{.js,.ts}'
        )
      ],
      true
    )
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
