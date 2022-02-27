import { PgProductRepository } from '@/infra/database/repositories'

export const makePgProductRepository = (): PgProductRepository => {
  return new PgProductRepository()
}
