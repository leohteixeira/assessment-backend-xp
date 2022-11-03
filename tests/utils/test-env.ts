export const testEnv = {
  port: Number(process.env.PORT) || 3030,

  postgresHost: process.env.POSTGRES_TEST_HOST || 'localhost',
  postgresPort: Number(process.env.POSTGRES_TEST_PORT) || 5432,
  postgresUsername: process.env.POSTGRES_TEST_USERNAME || 'webjump',
  postgresPassword: process.env.POSTGRES_TEST_PASSWORD || 'secret',
  postgresDatabase: process.env.POSTGRES_TEST_DATABASE || 'webjump_pg_db',
  postgresSchema: process.env.POSTGRES_TEST_SCHEMA || 'test'
}
