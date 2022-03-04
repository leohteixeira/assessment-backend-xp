import { DbFindCategories } from '@/data/usecases'
import { FindCategoriesRepositorySpy } from '@/tests/data/mocks'
import { mockFindCategoriesParams } from '@/tests/domain/mocks'
import { throwError } from '@/tests/utils'

type SutTypes = {
  sut: DbFindCategories
  findCategoriesRepositorySpy: FindCategoriesRepositorySpy
}

const makeSut = (): SutTypes => {
  const findCategoriesRepositorySpy = new FindCategoriesRepositorySpy()
  const sut = new DbFindCategories(findCategoriesRepositorySpy)
  return {
    sut,
    findCategoriesRepositorySpy
  }
}

describe('DbFindCategories Usecase', () => {
  test('Should call FindCategoriesRepository with correct values', async () => {
    const { sut, findCategoriesRepositorySpy } = makeSut()
    const params = mockFindCategoriesParams()
    await sut.find(params)
    expect(findCategoriesRepositorySpy.params).toEqual(params)
  })

  test('Should throw if FindCategoriesRepository throws', async () => {
    const { sut, findCategoriesRepositorySpy } = makeSut()
    jest.spyOn(findCategoriesRepositorySpy, 'findCategories').mockImplementationOnce(throwError)
    const promise = sut.find(mockFindCategoriesParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return DatabaseDocument.List on success', async () => {
    const { sut, findCategoriesRepositorySpy } = makeSut()
    const result = await sut.find(mockFindCategoriesParams())
    expect(result).toEqual(findCategoriesRepositorySpy.result)
  })
})
