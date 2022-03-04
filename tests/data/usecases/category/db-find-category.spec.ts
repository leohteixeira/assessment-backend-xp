import { DbFindCategory } from '@/data/usecases'
import { FindCategoryRepositorySpy } from '@/tests/data/mocks'
import { mockFindCategoryParams } from '@/tests/domain/mocks'
import { throwError } from '@/tests/utils'

type SutTypes = {
  sut: DbFindCategory
  findCategoryRepositorySpy: FindCategoryRepositorySpy
}

const makeSut = (): SutTypes => {
  const findCategoryRepositorySpy = new FindCategoryRepositorySpy()
  const sut = new DbFindCategory(findCategoryRepositorySpy)
  return {
    sut,
    findCategoryRepositorySpy
  }
}

describe('DbFindCategory Usecase', () => {
  test('Should call FindCategoryRepository with correct values', async () => {
    const { sut, findCategoryRepositorySpy } = makeSut()
    const params = mockFindCategoryParams()
    await sut.find(params)
    expect(findCategoryRepositorySpy.params).toEqual(params)
  })

  test('Should throw if FindCategoryRepository throws', async () => {
    const { sut, findCategoryRepositorySpy } = makeSut()
    jest.spyOn(findCategoryRepositorySpy, 'findCategory').mockImplementationOnce(throwError)
    const promise = sut.find(mockFindCategoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return Category.Model on success', async () => {
    const { sut, findCategoryRepositorySpy } = makeSut()
    const result = await sut.find(mockFindCategoryParams())
    expect(result).toEqual(findCategoryRepositorySpy.result)
  })
})
