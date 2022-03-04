import { HttpError } from '@/presentation/errors'
import { EditCategoryController } from '@/presentation/controllers'
import { EditCategorySpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/utils'
import { mockEditCategoryParams } from '@/tests/domain/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'

const mockRequest = (): EditCategoryController.Request => mockEditCategoryParams()

type SutTypes = {
  sut: EditCategoryController
  validationSpy: ValidationSpy
  editCategorySpy: EditCategorySpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const editCategorySpy = new EditCategorySpy()
  const sut = new EditCategoryController(validationSpy, editCategorySpy)

  return {
    sut,
    validationSpy,
    editCategorySpy
  }
}

describe('EditCategory Controller', () => {
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

  test('Should call EditCategory with correct values', async () => {
    const { sut, editCategorySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(editCategorySpy.params).toEqual({
      categoryId: request.categoryId,
      name: request.name,
      code: request.code
    })
  })

  test('Should return ServerError if EditCategory throws', async () => {
    const { sut, editCategorySpy } = makeSut()
    jest.spyOn(editCategorySpy, 'edit').mockImplementationOnce(throwError)
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should return ok if request is succeeded', async () => {
    const { sut, editCategorySpy } = makeSut()
    const result = await sut.handle(mockRequest())
    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(editCategorySpy.result)
  })
})
