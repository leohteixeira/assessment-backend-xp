import { RemoveProduct } from '@/domain/usecases'
import { HttpError } from '@/presentation/errors'
import { noContent } from '@/presentation/helpers'
import { Http } from '@/presentation/protocols'
import { Validation } from '@/validation/protocols'

export class RemoveProductController implements Http.Controller {
  constructor(
    private readonly validation: Validation<RemoveProductController.Request>,
    private readonly removeProduct: RemoveProduct
  ) {}

  async handle(
    request: RemoveProductController.Request
  ): Promise<Http.Response<RemoveProductController.Response>> {
    try {
      const badParams = await this.validation.validate(request)
      if (badParams) return new HttpError.BadRequest(badParams)

      await this.removeProduct.remove(request)

      return noContent()
    } catch (error) {
      return new HttpError.Server(String(error.stack))
    }
  }
}

export namespace RemoveProductController {
  export type Request = RemoveProduct.Params
  export type Response = RemoveProduct.Result
}
