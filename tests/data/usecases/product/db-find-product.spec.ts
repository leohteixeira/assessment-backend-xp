import { DbFindProduct } from '@/data/usecases'
import { FindProductRepositorySpy } from '@/tests/data/mocks'
import { mockFindProductParams } from '@/tests/domain/mocks'
import { throwError } from '@/tests/utils'

type SutTypes = {
  sut: DbFindProduct
  findProductRepositorySpy: FindProductRepositorySpy
}

const makeSut = (): SutTypes => {
  const findProductRepositorySpy = new FindProductRepositorySpy()
  const sut = new DbFindProduct(findProductRepositorySpy)
  return {
    sut,
    findProductRepositorySpy
  }
}

describe('DbFindProduct Usecase', () => {
  test('Should call FindProductRepository with correct values', async () => {
    const { sut, findProductRepositorySpy } = makeSut()
    const params = mockFindProductParams()
    await sut.find(params)
    expect(findProductRepositorySpy.params).toEqual(params)
  })

  test('Should throw if FindProductRepository throws', async () => {
    const { sut, findProductRepositorySpy } = makeSut()
    jest.spyOn(findProductRepositorySpy, 'findProduct').mockImplementationOnce(throwError)
    const promise = sut.find(mockFindProductParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return Product.Model on success', async () => {
    const { sut, findProductRepositorySpy } = makeSut()
    const result = await sut.find(mockFindProductParams())
    expect(result).toEqual(findProductRepositorySpy.result)
  })
})
