import 'module-alias/register'
import 'reflect-metadata'
import { IdentifiedError } from '@/domain/errors'
import { PostgresHelper } from '@/infra/database/helpers'
import { buildApp, env } from '@/main/config'

import path from 'path'

PostgresHelper.connect(env.postgresHost, env.postgresPort, env.postgresUsername, env.postgresPassword, env.postgresDatabase, [path.join(__dirname, '../infra/database/entities/*{.js,.ts}')], false)
  .then(buildApp)
  .then((app) =>
    app.listen(env.port, () => console.log(`Server running at port ${env.port}`))
  )
  .catch(console.error)

process.on('unhandledRejection', (reason, promise) => {
  console.error(`Unhandled Rejection at: ${String(promise)}, reason: ${String(reason)}`)
  // eslint-disable-next-line @typescript-eslint/no-throw-literal
  throw reason
})

process.on('uncaughtException', error => {
  console.error(`Uncaught Exception: ${String(error)}`)
  if (!(error instanceof IdentifiedError)) process.exit(1)
})
