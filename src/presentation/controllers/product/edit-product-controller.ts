import { EditProduct } from '@/domain/usecases'
import { HttpError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers'
import { Http } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export class EditProductController implements Http.Controller {
  constructor(
    private readonly validation: Validation<EditProductController.Request>,
    private readonly editProduct: EditProduct
  ) {}

  async handle(
    request: EditProductController.Request
  ): Promise<Http.Response<EditProductController.Response>> {
    try {
      const badParams = await this.validation.validate(request)
      if (badParams) return new HttpError.BadRequest(badParams)

      const result = await this.editProduct.edit({
        ...request
      })

      return ok(result)
    } catch (error) {
      return new HttpError.Server(String(error.stack))
    }
  }
}

export namespace EditProductController {
  export type Request = EditProduct.Params
  export type Response = EditProduct.Result
}
