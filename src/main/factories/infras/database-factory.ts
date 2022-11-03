import {
  PgProductRepository,
  PgCategoryRepository
} from '@/infra/database/repositories'

export const makePgProductRepository = (): PgProductRepository => {
  return new PgProductRepository()
}

export const makePgCategoryRepository = (): PgCategoryRepository => {
  return new PgCategoryRepository()
}
