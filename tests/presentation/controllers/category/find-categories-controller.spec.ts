import { FindCategoriesController } from '@/presentation/controllers'
import { HttpError } from '@/presentation/errors'
import { FindCategoriesSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/utils'
import { ValidationSpy } from '@/tests/validation/mocks'

import { datatype, random } from 'faker'

const mockRequest = (): FindCategoriesController.Request => ({
  search: random.word(),
  searchValue: random.word(),
  limit: datatype.number({ min: 1 }),
  page: datatype.number({ min: 1 })
})

type SutTypes = {
  sut: FindCategoriesController
  validationSpy: ValidationSpy
  findCategoriesSpy: FindCategoriesSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const findCategoriesSpy = new FindCategoriesSpy()
  const sut = new FindCategoriesController(validationSpy, findCategoriesSpy)

  return {
    sut,
    validationSpy,
    findCategoriesSpy
  }
}

describe('FindCategories Controller', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return BadRequest if validation return invalid params', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockResolvedValueOnce({
      param: 'error'
    })
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.BadRequest)
  })

  test('Should return ServerError if validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(
      throwError
    )
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should call FindCategories with correct values', async () => {
    const { sut, findCategoriesSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(findCategoriesSpy.params).toEqual({ query: request })
  })

  test('Should return ServerError if FindCategories throws', async () => {
    const { sut, findCategoriesSpy } = makeSut()
    jest.spyOn(findCategoriesSpy, 'find').mockImplementationOnce(throwError)
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should return ok if request is succeeded', async () => {
    const { sut, findCategoriesSpy } = makeSut()
    const result = await sut.handle(mockRequest())
    expect(result.body).toEqual(findCategoriesSpy.result)
    expect(result.statusCode).toEqual(200)
  })
})
