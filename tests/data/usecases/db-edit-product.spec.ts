import { DbEditProduct } from '@/data/usecases'
import { EditProductRepositorySpy } from '@/tests/data/mocks'
import { mockEditProductParams } from '@/tests/domain/mocks'
import { throwError } from '@/tests/utils'

import MockDate from 'mockdate'

type SutTypes = {
  sut: DbEditProduct
  editProductRepositorySpy: EditProductRepositorySpy
}

const makeSut = (): SutTypes => {
  const editProductRepositorySpy = new EditProductRepositorySpy()
  const sut = new DbEditProduct(editProductRepositorySpy)
  return {
    sut,
    editProductRepositorySpy
  }
}

describe('DbEditProduct Usecase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call EditProductRepository with correct values', async () => {
    const { sut, editProductRepositorySpy } = makeSut()
    const params = mockEditProductParams()
    await sut.edit(params)
    expect(editProductRepositorySpy.params).toEqual(params)
  })

  test('Should throw if EditProductRepository throws', async () => {
    const { sut, editProductRepositorySpy } = makeSut()
    jest.spyOn(editProductRepositorySpy, 'editProduct').mockImplementationOnce(
      throwError
    )
    const promise = sut.edit(mockEditProductParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return a Product.Model on success', async () => {
    const { sut, editProductRepositorySpy } = makeSut()
    const result = await sut.edit(mockEditProductParams())
    expect(result).toEqual(editProductRepositorySpy.result)
  })
})
