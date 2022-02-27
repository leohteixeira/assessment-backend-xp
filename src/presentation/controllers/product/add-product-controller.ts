import { AddProduct } from '@/domain/usecases'
import { HttpError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers'
import { Http } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export class AddProductController implements Http.Controller {
  constructor (
    private readonly validation: Validation<AddProductController.Request>,
    private readonly addProduct: AddProduct
  ) {}

  async handle (request: AddProductController.Request): Promise<Http.Response<AddProductController.Response>> {
    try {
      const badParams = await this.validation.validate(request)
      if (badParams) return new HttpError.BadRequest(badParams)

      const result = await this.addProduct.add({
        name: request.name,
        sku: request.sku,
        price: request.price,
        description: request.description,
        quantity: request.quantity,
        categoryId: request.categoryId
      })

      return ok(result)
    } catch (error) {
      return new HttpError.Server(String(error.stack))
    }
  }
}

export namespace AddProductController {
  export type Request = AddProduct.Params
  export type Response = AddProduct.Result
}
