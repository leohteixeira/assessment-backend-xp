import { DbEditCategory } from '@/data/usecases'
import { EditCategoryRepositorySpy } from '@/tests/data/mocks'
import { mockEditCategoryParams } from '@/tests/domain/mocks'
import { throwError } from '@/tests/utils'

type SutTypes = {
  sut: DbEditCategory
  editCategoryRepositorySpy: EditCategoryRepositorySpy
}

const makeSut = (): SutTypes => {
  const editCategoryRepositorySpy = new EditCategoryRepositorySpy()
  const sut = new DbEditCategory(editCategoryRepositorySpy)
  return {
    sut,
    editCategoryRepositorySpy
  }
}

describe('DbEditCategory Usecase', () => {
  test('Should call EditCategoryRepository with correct values', async () => {
    const { sut, editCategoryRepositorySpy } = makeSut()
    const params = mockEditCategoryParams()
    await sut.edit(params)
    expect(editCategoryRepositorySpy.params).toEqual(params)
  })

  test('Should throw if EditCategoryRepository throws', async () => {
    const { sut, editCategoryRepositorySpy } = makeSut()
    jest
      .spyOn(editCategoryRepositorySpy, 'editCategory')
      .mockImplementationOnce(throwError)
    const promise = sut.edit(mockEditCategoryParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a Category.Model on success', async () => {
    const { sut, editCategoryRepositorySpy } = makeSut()
    const result = await sut.edit(mockEditCategoryParams())
    expect(result).toEqual(editCategoryRepositorySpy.result)
  })
})
