import { Http } from '@/presentation/protocols'

export const ok = <T extends any>(data: T): Http.Response<T> => ({
  statusCode: 200,
  body: data
})
