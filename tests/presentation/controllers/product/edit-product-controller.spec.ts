import { HttpError } from '@/presentation/errors'
import { EditProductController } from '@/presentation/controllers'
import { EditProductSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/utils'
import { mockEditProductParams } from '@/tests/domain/mocks'
import { ValidationSpy } from '@/tests/validation/mocks'

const mockRequest = (): EditProductController.Request => mockEditProductParams()

type SutTypes = {
  sut: EditProductController
  validationSpy: ValidationSpy
  editProductSpy: EditProductSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const editProductSpy = new EditProductSpy()
  const sut = new EditProductController(validationSpy, editProductSpy)

  return {
    sut,
    validationSpy,
    editProductSpy
  }
}

describe('EditProduct Controller', () => {
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
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should call EditProduct with correct values', async () => {
    const { sut, editProductSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(editProductSpy.params).toEqual({
      productId: request.productId,
      name: request.name,
      sku: request.sku,
      price: request.price,
      description: request.description,
      quantity: request.quantity,
      categories: request.categories
    })
  })

  test('Should return ServerError if EditProduct throws', async () => {
    const { sut, editProductSpy } = makeSut()
    jest.spyOn(editProductSpy, 'edit').mockImplementationOnce(throwError)
    const result = await sut.handle(mockRequest())
    expect(result).toBeInstanceOf(HttpError.Server)
  })

  test('Should return ok if request is succeeded', async () => {
    const { sut, editProductSpy } = makeSut()
    const result = await sut.handle(mockRequest())
    expect(result.statusCode).toEqual(200)
    expect(result.body).toEqual(editProductSpy.result)
  })
})
