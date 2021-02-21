export {}

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAValidField(): R,
      toBeAnInvalidField(): R,
      toBeAnUnvalidatedField(): R,
    }
  }
}