import { DbFindProducts } from '@/data/usecases'
import { FindProductsRepositorySpy } from '@/tests/data/mocks'
import { mockFindProductsParams } from '@/tests/domain/mocks'
import { throwError } from '@/tests/utils'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbFindProducts
  findProductsRepositorySpy: FindProductsRepositorySpy
}

const makeSut = (): SutTypes => {
  const findProductsRepositorySpy = new FindProductsRepositorySpy()
  const sut = new DbFindProducts(findProductsRepositorySpy)
  return {
    sut,
    findProductsRepositorySpy
  }
}

describe('DbFindProducts Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call FindProductsRepository with correct values', async () => {
    const { sut, findProductsRepositorySpy } = makeSut()
    const params = mockFindProductsParams()
    await sut.find(params)
    expect(findProductsRepositorySpy.params).toEqual(params)
  })

  test('Should throw if FindProductsRepository throws', async () => {
    const { sut, findProductsRepositorySpy } = makeSut()
    jest.spyOn(findProductsRepositorySpy, 'findProducts').mockImplementationOnce(throwError)
    const promise = sut.find(mockFindProductsParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return DatabaseDocument.List on success', async () => {
    const { sut, findProductsRepositorySpy } = makeSut()
    const result = await sut.find(mockFindProductsParams())
    expect(result).toEqual(findProductsRepositorySpy.result)
  })
})
