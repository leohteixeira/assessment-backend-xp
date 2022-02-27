export const testEnv = {
  postgresTestHost: process.env.POSTGRES_TEST_HOST || 'localhost',
  postgresTestPort: Number(process.env.POSTGRES_TEST_PORT) || 5432,
  postgresTestUsername: process.env.POSTGRES_TEST_USERNAME || 'test',
  postgresTestPassword: process.env.POSTGRES_TEST_PASSWORD || 'test',
  postgresTestDatabase: process.env.POSTGRES_TEST_DATABASE || 'webjump-test-db'
}
