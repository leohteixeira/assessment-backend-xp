import { DbRemoveCategory } from '@/data/usecases'
import { RemoveCategory } from '@/domain/usecases'
import { RemoveCategoryRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/utils'

import { datatype } from 'faker'

const mockRemoveCategoryParams = (): RemoveCategory.Params => ({
  categoryId: datatype.uuid()
})

type SutTypes = {
  sut: DbRemoveCategory
  removeCategoryRepositorySpy: RemoveCategoryRepositorySpy
}

const makeSut = (): SutTypes => {
  const removeCategoryRepositorySpy = new RemoveCategoryRepositorySpy()
  const sut = new DbRemoveCategory(removeCategoryRepositorySpy)
  return {
    sut,
    removeCategoryRepositorySpy
  }
}

describe('DbRemoveCategory Usecase', () => {
  test('Should call RemoveCategoryRepository with correct values', async () => {
    const { sut, removeCategoryRepositorySpy } = makeSut()
    const params = mockRemoveCategoryParams()
    await sut.remove(params)
    expect(removeCategoryRepositorySpy.params).toEqual(params)
  })

  test('Should throw if RemoveCategoryRepository throws', async () => {
    const { sut, removeCategoryRepositorySpy } = makeSut()
    jest.spyOn(removeCategoryRepositorySpy, 'removeCategory').mockImplementationOnce(
      throwError
    )
    const promise = sut.remove(mockRemoveCategoryParams())
    await expect(promise).rejects.toThrow()
  })
})
