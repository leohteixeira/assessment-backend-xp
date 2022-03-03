import { DbAddCategory } from '@/data/usecases'
import { AddCategoryRepositorySpy } from '@/tests/data/mocks'
import { mockAddCategoryParams } from '@/tests/domain/mocks'
import { throwError } from '@/tests/utils'

type SutTypes = {
  sut: DbAddCategory
  addCategoryRepositorySpy: AddCategoryRepositorySpy
}

const makeSut = (): SutTypes => {
  const addCategoryRepositorySpy = new AddCategoryRepositorySpy()
  const sut = new DbAddCategory(addCategoryRepositorySpy)
  return {
    sut,
    addCategoryRepositorySpy
  }
}

describe('DbAddCategory Usecase', () => {
  test('Should call AddCategoryRepository with correct values', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    const params = mockAddCategoryParams()
    await sut.add(params)
    expect(addCategoryRepositorySpy.params).toEqual(params)
  })

  test('Should throw if AddCategoryRepository throws', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    jest.spyOn(addCategoryRepositorySpy, 'add').mockImplementationOnce(
      throwError
    )
    const promise = sut.add(mockAddCategoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an Category.Model on success', async () => {
    const { sut, addCategoryRepositorySpy } = makeSut()
    const result = await sut.add(mockAddCategoryParams())
    expect(result).toEqual(addCategoryRepositorySpy.result)
  })
})
