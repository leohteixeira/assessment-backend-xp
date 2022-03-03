import { Http } from '@/presentation/protocols'

export const ok = <T extends any>(data: T): Http.Response<T> => ({
  statusCode: 200,
  body: data
})

export const noContent = (): Http.Response<null> => ({
  statusCode: 204,
  body: null
})
