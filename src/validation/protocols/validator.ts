export interface Validator<T = any> {
  validate: (value: Validator.Params<T>) => Validator.Result
}

export namespace Validator {
  export type Params<T> = T[keyof T]

  export type Result = Promise<void | string>
}
