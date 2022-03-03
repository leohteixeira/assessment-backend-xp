import { DbRemoveProduct } from '@/data/usecases'
import { RemoveProduct } from '@/domain/usecases'
import { RemoveProductRepositorySpy } from '@/tests/data/mocks'
import { throwError } from '@/tests/utils'

import { datatype } from 'faker'

const mockRemoveProductParams = (): RemoveProduct.Params => ({
  productId: datatype.uuid()
})

type SutTypes = {
  sut: DbRemoveProduct
  removeProductRepositorySpy: RemoveProductRepositorySpy
}

const makeSut = (): SutTypes => {
  const removeProductRepositorySpy = new RemoveProductRepositorySpy()
  const sut = new DbRemoveProduct(removeProductRepositorySpy)
  return {
    sut,
    removeProductRepositorySpy
  }
}

describe('DbRemoveProduct Usecase', () => {
  test('Should call RemoveProductRepository with correct values', async () => {
    const { sut, removeProductRepositorySpy } = makeSut()
    const params = mockRemoveProductParams()
    await sut.remove(params)
    expect(removeProductRepositorySpy.params).toEqual(params)
  })

  test('Should throw if RemoveProductRepository throws', async () => {
    const { sut, removeProductRepositorySpy } = makeSut()
    jest.spyOn(removeProductRepositorySpy, 'removeProduct').mockImplementationOnce(
      throwError
    )
    const promise = sut.remove(mockRemoveProductParams())
    await expect(promise).rejects.toThrow()
  })
})
