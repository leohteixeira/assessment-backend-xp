import { FindProduct } from '@/domain/usecases'
import { HttpError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers'
import { Http } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export class FindProductController implements Http.Controller {
  constructor(
    private readonly validation: Validation<FindProductController.Request>,
    private readonly findProduct: FindProduct
  ) {}

  async handle(
    request: FindProductController.Request
  ): Promise<Http.Response<FindProductController.Response>> {
    try {
      const badParams = await this.validation.validate(request)
      if (badParams) return new HttpError.BadRequest(badParams)

      const result = await this.findProduct.find({
        productId: request.productId
      })

      return ok(result)
    } catch (error) {
      return new HttpError.Server(String(error.stack))
    }
  }
}

export namespace FindProductController {
  export type Request = FindProduct.Params
  export type Response = FindProduct.Result
}
