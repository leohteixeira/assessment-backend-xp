// import { version } from '../../../package.json'

export const env = {
  port: Number(process.env.PORT) || 3030,

  postgresHost: process.env.POSTGRES_HOST || 'localhost',
  postgresPort: Number(process.env.POSTGRES_PORT) || 5432,
  postgresUsername: process.env.POSTGRES_USERNAME || 'webjump',
  postgresPassword: process.env.POSTGRES_PASSWORD || 'secret',
  postgresDatabase: process.env.POSTGRES_DATABASE || 'webjump_pg_db'
}
