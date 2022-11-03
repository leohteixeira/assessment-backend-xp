export namespace Invalidation {
  export const invalidArrayIndex = (index: number, error: string): string =>
    `invalidArrayIndex=${index} error=${error}`
  export const maxLength = (length: number): string => `maxLength=${length}`
  export const minLength = (length: number): string => `minLength=${length}`
  export const maxValue = (value: number): string => `maxValue=${value}`
  export const minValue = (value: number): string => `minValue=${value}`
  export const pattern = (): string => 'pattern'
  export const required = (): string => 'required'
  export const type = (): string => 'type'
}
