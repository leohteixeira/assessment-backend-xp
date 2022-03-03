import { DbAddProduct } from '@/data/usecases'
import { AddProductRepositorySpy } from '@/tests/data/mocks'
import { mockAddProductParams } from '@/tests/domain/mocks'
import { throwError } from '@/tests/utils'

type SutTypes = {
  sut: DbAddProduct
  addProductRepositorySpy: AddProductRepositorySpy
}

const makeSut = (): SutTypes => {
  const addProductRepositorySpy = new AddProductRepositorySpy()
  const sut = new DbAddProduct(addProductRepositorySpy)
  return {
    sut,
    addProductRepositorySpy
  }
}

describe('DbAddProduct Usecase', () => {
  test('Should call AddProductRepository with correct values', async () => {
    const { sut, addProductRepositorySpy } = makeSut()
    const params = mockAddProductParams()
    await sut.add(params)
    expect(addProductRepositorySpy.params).toEqual(params)
  })

  test('Should throw if AddProductRepository throws', async () => {
    const { sut, addProductRepositorySpy } = makeSut()
    jest.spyOn(addProductRepositorySpy, 'add').mockImplementationOnce(
      throwError
    )
    const promise = sut.add(mockAddProductParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return an Product.Model on success', async () => {
    const { sut, addProductRepositorySpy } = makeSut()
    const result = await sut.add(mockAddProductParams())
    expect(result).toEqual(addProductRepositorySpy.result)
  })
})
