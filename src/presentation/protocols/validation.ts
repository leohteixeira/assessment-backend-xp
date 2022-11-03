export interface Validation<T = any> {
  validate: (input: T) => Validation.Result<T>
}

export namespace Validation {
  export type BadParams<T> = {
    [key in keyof T]?: string | BadParams<T[key]>
  }

  export type Result<T> = Promise<void | Validation.BadParams<T>>
}
